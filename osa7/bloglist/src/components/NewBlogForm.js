import React from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Input from './Input';

const NewBlogForm = ({ addBlog, newTitle, newAuthor, newUrl }) => {
  return (
    <div>
      <h3>Add new blog</h3>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <br />
          <Input {...newTitle} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Author:</Form.Label>
          <br />
          <Input {...newAuthor} />
        </Form.Group>
        <Form.Group>
          <Form.Label>URL:</Form.Label>
          <br />
          <Input {...newUrl} />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Create
        </Button>
      </Form>
    </div>
  );
};

NewBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  newTitle: PropTypes.object.isRequired,
  newAuthor: PropTypes.object.isRequired,
  newUrl: PropTypes.object.isRequired
};

export default NewBlogForm;
