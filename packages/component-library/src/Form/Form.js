import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";
import _ from "lodash";

export const formFromFields = (fields, formikProps, dynamicRequire) =>
  Object.keys(fields).map(id =>
    React.createElement(fields[id].component, {
      key: id,
      id,
      label: fields[id].label,
      options: { ...fields[id].options },
      formik: formikProps,
      isRequired: !!(
        dynamicRequire[id] ||
        _.get(fields[id], "validation._exclusive.required")
      )
    })
  );

class Form extends React.Component {
  render() {
    const {
      fields,
      initialValues,
      sections,
      children,
      validate,
      handleReset
    } = this.props;
    const fieldIds = Object.keys(fields);
    const validations = Object.fromEntries(
      fieldIds.map(id => [id, fields[id].validation])
    );
    const validationSchema = Yup.object(validations);
    return (
      <Formik
        validate={validate}
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        handleReset={handleReset}
        onSubmit={(values, formikBag) => {
          // This is a work around to be able to encapsulate
          // attaching state handling upon submission within the form.
          const addHandlers = promise =>
            promise.then(
              result => {
                formikBag.resetForm();
                formikBag.setSubmitting(false);
                return result;
              },
              error => {
                formikBag.setSubmitting(false);
                formikBag.setErrors(error.validationErrors);
                throw error;
              }
            );
          // eslint-disable-next-line react/destructuring-assignment
          return this.props.onSubmit(values, addHandlers);
        }}
        render={formikProps => {
          const dynamicRequire = validate ? validate(formikProps.values) : {};
          const visibleIf = formikProps.values._visibleIf
            ? formikProps.values._visibleIf
            : {};
          const form = (
            <Fragment>
              {formFromFields(fields, formikProps, dynamicRequire)}
            </Fragment>
          );
          const formSections =
            sections && sections.length > 0
              ? Object.fromEntries(
                  sections.map(section => [
                    section,
                    <Fragment>
                      {formFromFields(
                        _.pickBy(fields, field => field.section === section),
                        formikProps,
                        dynamicRequire
                      )}
                    </Fragment>
                  ])
                )
              : {};
          const formFields =
            fieldIds && fieldIds.length > 0
              ? Object.fromEntries(
                  fieldIds.map(id => [
                    id,
                    <Fragment>
                      {formFromFields(
                        _.pick(fields, id),
                        formikProps,
                        dynamicRequire
                      )}
                    </Fragment>
                  ])
                )
              : {};
          // Uncomment next line to see what formik can pass to the form
          // console.log('formikProps', formikProps);
          return (
            <div>
              {children({
                form,
                formSections,
                formFields,
                isValid: formikProps.isValid,
                isDirty: formikProps.dirty,
                isSubmitting: formikProps.isSubmitting,
                handleSubmit: formikProps.handleSubmit,
                handleCancel: formikProps.handleReset,
                resetForm: formikProps.resetForm,
                values: formikProps.values,
                visibleIf,
                formErrors: formikProps.errors,
                initialValues: formikProps.initialValues
                /* could return more formikProps if needed */
              })}
            </div>
          );
        }}
      />
    );
  }
}

Form.propTypes = {
  fields: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.string,
      component: PropTypes.component,
      validation: PropTypes.shape({
        /* Yup validation */
      })
      // sections: PropTypes.arrayOf(PropTypes.string) <- optional
    })
  ).isRequired,
  initialValues: PropTypes.shape({}),
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  validate: PropTypes.func,
  handleReset: PropTypes.func,
  sections: PropTypes.oneOfType([PropTypes.array])
};

export default Form;
