import PropTypes from "prop-types";
import { getKeyNames } from "../../stories/shared";

const cardMetaObjectProperties = {
  title: PropTypes.string,
  slug: PropTypes.string,
  introText: PropTypes.node,
  additionalText: PropTypes.node,
  shareText: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  selector: PropTypes.node,
  analysis: PropTypes.node,
  metadata: PropTypes.node,
  metadataQA: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({ section: PropTypes.string }),
      PropTypes.shape({ question: PropTypes.string, answer: PropTypes.string })
    ])
  ),
  resources: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({ section: PropTypes.string }),
      PropTypes.shape({
        link: PropTypes.string /* url */,
        description: PropTypes.string
      })
    ])
  ),
  authors: PropTypes.arrayOf(PropTypes.string /* image url */)
};

export const optionalCardMetaKeys = {
  metadataQA: true,
  selector: true
};

export const cardMetaKeys = getKeyNames(cardMetaObjectProperties);

const cardMetaTypes = PropTypes.shape(cardMetaObjectProperties);

export default cardMetaTypes;
