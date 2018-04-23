travis:
	@if [ "$$SUITE" = "2017" ]; then \
		echo "\n--- Budget Tests\n"; \
		cd packages/budget && yarn test; cd -; \
		\
		echo "\n--- Emergency Response Tests\n"; \
		cd packages/emergency-response && yarn test; cd -; \
		\
		echo "\n--- Homelessness Tests\n"; \
		cd packages/homelessness && yarn test; cd -; \
		\
		echo "\n--- Housing Tests\n"; \
		cd packages/housing && yarn test; cd -; \
		\
		echo "\n--- Transportation Tests\n"; \
		cd packages/transportation && yarn test; cd -; \
		\
		echo "\n--- 2017 Tests\n"; \
		cd packages/2017 && yarn test; cd -; \
	fi

	@if [ "$$SUITE" = "2018" ]; then \
		echo "\n--- Disaster Tests\n"; \
		cd packages/2018-disaster-resilience && yarn test; cd -; \
		\
		echo "\n--- Housing Tests\n"; \
		cd packages/2018-housing-affordability && yarn test; cd -; \
		\
		echo "\n--- Elections Tests\n"; \
		cd packages/2018-local-elections && yarn test; cd -; \
		\
		echo "\n--- Neighborhood Tests\n"; \
		cd packages/2018-neighborhood-development && yarn test; cd -; \
		\
		echo "\n--- Transportation Tests\n"; \
		cd packages/2018-transportation-systems && yarn test; cd -; \
		\
		echo "\n--- 2018 Tests\n"; \
		cd packages/2018 && yarn test; cd -; \
	fi

	@if [ "$$SUITE" = "COMPONENT_LIBRARY" ]; then \
		cd packages/component-library && yarn test && cd -; \
	fi
