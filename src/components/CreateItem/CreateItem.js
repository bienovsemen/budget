import React from 'react';
import { connect } from 'react-redux';
import { Form, InputNumber, Input, Select, Button } from 'antd';
import { itemAddToCategory } from '../../_actions';

import './create-item.css';

const Option = Select.Option;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class CreateItem extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const item = Object.assign(values, { categoryId: this.props.categoryChoosed });
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
      <Form layout="inline" className="create-item" onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={titleError ? 'error' : ''} help={titleError || ''}>
          {getFieldDecorator('title', {
            rules: [{ min: 1, required: true }]
          })(<Input placeholder="Type a name" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('amount', {
            initialValue: 0,
            rules: [{ type: 'number', message: 'Please, fill only with numbers' }]
          })(
            <InputNumber
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              min={0}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('type', {
            initialValue: 'inc'
          })(
            <Select width={60}>
              <Option value="inc">incomes</Option>
              <Option value="dec">expenses</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: 85 }} disabled={hasErrors(getFieldsError())}>
            Add
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const CreateItemForm = Form.create({ name: 'create_item_form' })(CreateItem);

const mapStateToProps = ({ categoriesList: { categoryChoosed } }) => {
  return { categoryChoosed };
};

const mapDispatchToProps = {
  onAdd: itemAddToCategory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateItemForm);
