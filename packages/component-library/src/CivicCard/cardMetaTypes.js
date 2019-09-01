import PropTypes from "prop-types";

const cardMetaObjectProperties = {
  title: PropTypes.string.isRequired,
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
    PropTypes.shape({
      heading: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          link: PropTypes.string,
          description: PropTypes.string
        })
      )
    })
  ),
  // authors: PropTypes.arrayOf(PropTypes.string /* image url */)
  authors: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string /* author email */),
    PropTypes.oneOf(["Demo"])
  ])
};

export const optionalCardMetaKeys = {
  selector: true,
  metadataQA: true
};

const getKeyNames = obj => {
  const keyNames = {};
  Object.keys(obj).forEach(key => {
    keyNames[key] = key;
  });
  return keyNames;
};

export const cardMetaKeys = getKeyNames(cardMetaObjectProperties);

const cardMetaTypes = PropTypes.shape(cardMetaObjectProperties);

export default cardMetaTypes;
