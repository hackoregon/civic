travis:
	@if [ "$$SUITE" = "2017" ]; then \
		echo "\n--- Budget Tests\n"; \
		cd packages/budget && yarn test && cd -; \
		\
		echo "\n--- Emergency Response Tests\n"; \
		cd packages/emergency-response && yarn test && cd -; \
		\
		echo "\n--- Homelessness Tests\n"; \
		cd packages/homelessness && yarn test && cd -; \
		\
		echo "\n--- Housing Tests\n"; \
		cd packages/housing && yarn test && cd -; \
		\
		echo "\n--- Transportation Tests\n"; \
		cd packages/transportation && yarn test && cd -; \
		\
		echo "\n--- 2017 Tests\n"; \
		cd packages/2017 && yarn test && cd -; \
		\
		echo "\n--- Build 2017\n"; \
		cd packages/2017 && yarn build --bail && cd -; \
	fi

	@if [ "$$SUITE" = "2018" ]; then \
		echo "\n--- Disaster Tests\n"; \
		cd packages/2018-disaster-resilience && yarn test && cd -; \
		\
		echo "\n--- Housing Tests\n"; \
		cd packages/2018-housing-affordability && yarn test && cd -; \
		\
		echo "\n--- Elections Tests\n"; \
		cd packages/2018-local-elections && yarn test && cd -; \
		\
		echo "\n--- Neighborhood Tests\n"; \
		cd packages/2018-neighborhood-development && yarn test && cd -; \
		\
		echo "\n--- Transportation Tests\n"; \
		cd packages/2018-transportation-systems && yarn test && cd -; \
		\
		echo "\n--- Example Farmers Markets\n"; \
		cd packages/2018-example-farmers-markets && yarn test && cd -; \
		\
		echo "\n--- Civic Sandbox Tests\n"; \
		cd packages/civic-sandbox && yarn test && cd -; \
		\
		echo "\n--- 2018 Tests\n"; \
		cd packages/2018 && yarn test && cd -; \
		\
		echo "\n--- Build 2018\n"; \
		cd packages/2018 && yarn build --bail && cd -; \
	fi

	@if [ "$$SUITE" = "COMPONENT_LIBRARY" ]; then \
		cd packages/component-library && yarn test && cd -; \
	fi

	@if [ "$$SUITE" = "2019_DISASTER_GAME" ]; then \
		cd packages/2019-disaster-game && yarn test && cd -; \
	fi

deploy:
	@if [ -z "$$TRAVIS_PULL_REQUEST" ] || [ "$$TRAVIS_PULL_REQUEST" = "false" ]; then \
		if [ "$$TRAVIS_BRANCH" = "master" ]; then \
			if [ "$$SUITE" = "2017" ]; then \
				make deploy-2017; \
			fi; \
			if [ "$$SUITE" = "2018" ]; then \
				make deploy-2018; \
			fi; \
			if [ "$$SUITE" = "COMPONENT_LIBRARY" ]; then \
				make deploy-component-library; \
			fi; \
			if [ "$$SUITE" = "2019_DISASTER_GAME" ]; then \
				make deploy-2019-disaster-game; \
			fi \
		else \
			echo "No deploys on branches other than 'master'"; \
		fi \
	else \
		echo "No deploys on PRs"; \
	fi

setup-aws:
	@echo "Setting up AWS access"
	pip install --user awscli
	export PATH=$$PATH:$$HOME/.local/bin

access-ecr:
	@echo "Accessing ECR"
	eval $$(aws ecr get-login --no-include-email --region $$AWS_DEFAULT_REGION)

deploy-2017: setup-aws access-ecr
	@echo "Deploying the 2017 Container"
	cd packages/2017 && yarn run build
	cd packages/2017 && docker build -t civic-2017 .
	@echo "Pushing civic-2017:latest"
	cd packages/2017 && docker tag civic-2017:latest "$$REMOTE_IMAGE_URL/civic-2017:latest"
	cd packages/2017 && docker push "$$REMOTE_IMAGE_URL/civic-2017:latest"
	@echo "Pushed civic-2017:latest"
	@echo "Deploying latest for $$ECS_SERVICE_2017"
	./bin/ecs-deploy.sh --cluster $$ECS_CLUSTER --service-name $$ECS_SERVICE_2017 --image $$REMOTE_IMAGE_URL/civic-2017:latest --timeout 10

deploy-2018: setup-aws access-ecr
	@echo "Deploying the 2018 Container"
	cd packages/2018 && yarn run build
	cd packages/2018 && docker build -t civic-2018 .
	@echo "Pushing civic-2018:latest"
	cd packages/2018 && docker tag civic-2018:latest "$$REMOTE_IMAGE_URL/civic-2018:latest"
	cd packages/2018 && docker push "$$REMOTE_IMAGE_URL/civic-2018:latest"
	@echo "Pushed civic-2018:latest"
	@echo "Deploying latest for $$ECS_SERVICE_2018"
	docker push $$REMOTE_IMAGE_URL/civic-2018:latest
	./bin/ecs-deploy.sh --cluster $$ECS_CLUSTER --service-name $$ECS_SERVICE_2018 --image $$REMOTE_IMAGE_URL/civic-2018:latest --timeout 10

deploy-2019-disaster-game: setup-aws access-ecr
	@echo "Deploying the 2019-disaster-game Container"
	cd packages/2019-disaster-game && yarn run build
	cd packages/2019-disaster-game && docker build --build-arg SENTRYDSN=$$SENTRYDSN -t civic-2019-disaster-game .
	@echo "Pushing civic-2019-disaster-game:latest"
	cd packages/2019-disaster-game && docker tag civic-2019-disaster-game:latest "$$REMOTE_IMAGE_URL/civic-2019-disaster-game:latest"
	cd packages/2019-disaster-game && docker push "$$REMOTE_IMAGE_URL/civic-2019-disaster-game:latest"
	@echo "Pushed civic-2019-disaster-game:latest"
	@echo "Deploying latest for $$ECS_SERVICE_2019_DISASTER_GAME"
	docker push $$REMOTE_IMAGE_URL/civic-2019-disaster-game:latest
	./bin/ecs-deploy.sh --cluster $$ECS_CLUSTER --service-name $$ECS_SERVICE_2019_DISASTER_GAME --image $$REMOTE_IMAGE_URL/civic-2019-disaster-game:latest --timeout 10

publish-canary-packages:
	@echo "Setting npm credentials"
	npm config set //registry.npmjs.org/:_authToken=${NPM_TOKEN}
	@echo "Publishing canary versions of packages to npm"
	yarn run publish-canary


