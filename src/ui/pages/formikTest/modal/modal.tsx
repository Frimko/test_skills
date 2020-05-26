import React from 'react';
import { useFormik } from 'formik';
import {
  Grid, TextField, Button,
} from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import * as yup from 'yup';

import Modal from 'ui/components/modal';


import * as s from './modal.style';

export type FormSubmitDataType = {
  name: string,
  address: string,
  phone: string
};

type Props = {
  isOpen: boolean,
  onClose: Function,
  children?: React.ReactNode,
  initialValues?: FormSubmitDataType,
  onSubmit?: (values: FormSubmitDataType)=> Promise<any>
};

const FormModal: React.FC<Props> = ({
  isOpen = false,
  onClose,
  children,
  onSubmit,
  initialValues,
}) => {
  const [error, setError] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const formik = useFormik({
    validationSchema: yup.object({
      name: yup.string().required(),
      address: yup.string().required(),
      phone: yup.string().required(),
    }),
    initialValues: initialValues || {
      name: '',
      address: '',
      phone: '',
    },
    enableReinitialize: true,

    onSubmit: (values: FormSubmitDataType) => {
      setLoading(true);
      if (onSubmit) {
        onSubmit(values)
          .then(() => onClose())
          .catch(setError)
          .finally(() => setLoading(false));
      }
    },
  });

  const disabledButton = formik.values.name && formik.values.address && formik.values.phone && formik.isValid;
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <s.Body>
        <form
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
          >
            <TextField
              required
              autoFocus
              label="name"
              placeholder="name"
              name="name"
              disabled={isLoading}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={(formik.touched.name && !!formik.errors.name) || !!error}
            />
            <TextField
              required
              placeholder="address"
              name="address"
              label="address"
              disabled={isLoading}
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={(formik.touched.address && !!formik.errors.address) || !!error}
            />
            <TextField
              required
              placeholder="phone"
              name="phone"
              label="phone"
              disabled={isLoading}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={(formik.touched.phone && !!formik.errors.phone) || !!error}
            />
            <Grid
              container
              justify="flex-end"
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<Send />}
                disabled={!disabledButton || isLoading}
              >
                {isLoading ? 'Loading…' : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </s.Body>
      {children}
    </Modal>
  );
};

export default FormModal;
