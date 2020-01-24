import React from 'react';
import { connect } from 'react-redux';
import uid from 'uid';
import { Form, Input, Button } from 'antd';
import { categoryAddedToBudget } from '../../_actions';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class CreateCategory extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const item = Object.assign({}, values, { id: uid(7) });
        this.props.onAdd(item);
        this.props.form.resetFields();
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const titleError = isFieldTouched('title') && getFieldError('title');
    return (
      <Form layout="inline" className="create-category" onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={titleError ? 'error' : ''} help={titleError || ''}>
          {getFieldDecorator('title', {
            rules: [{ min: 1, required: true }]
          })(<Input placeholder="Type a name" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon="plus" disabled={hasErrors(getFieldsError())}></Button>
        </Form.Item>
      </Form>
    );
  }
}

const CreateItemForm = Form.create({ name: 'create_category_form' })(CreateCategory);

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  onAdd: categoryAddedToBudget
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateItemForm);
