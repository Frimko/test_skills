import React from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import _pick from 'lodash/pick';

import TransitionsModal, { FormSubmitDataType } from 'ui/pages/formikTest/modal';

import * as s from './table.style';

type ItemType = {
  id: number,
  name: string,
  address: string,
  phone: string,
  createdAt: string,
  updatedAt: string,
};
type TablePropsType = {
  onChangePage: (page: number) => Promise<any>,
  onAdd: (values: FormSubmitDataType) => Promise<any>,
  onUpdate: (id: number, values: FormSubmitDataType) => Promise<any>,
  onDelete: (id: number) => Promise<any>,
  page?: number,
  isLoading?: boolean,
  items: ItemType[]
};

const Table: React.FC<TablePropsType> = ({
  items,
  onChangePage,
  isLoading,
  onAdd,
  onUpdate,
  onDelete,
  page = 0,
}) => {
  const [isOpen, onOpenPopup] = React.useState(false);
  const [initialValuesForm, setInitialValuesForm] = React.useState<FormSubmitDataType & {id: number}>();

  const handleOpenPopup = () => onOpenPopup(true);
  const handleClosePopup = () => onOpenPopup(false);
  const handleSubmit = initialValuesForm
    ? (values: FormSubmitDataType) => onUpdate(initialValuesForm.id, values)
    : onAdd;

  return (
    <>
      <TransitionsModal
        isOpen={isOpen}
        onClose={handleClosePopup}
        onSubmit={handleSubmit}
        initialValues={initialValuesForm}
      />
      <MaterialTable
        title={(
          <s.ButtonAddWrapper>
            <Button
              onClick={handleOpenPopup}
              variant="contained"
              color="primary"
              endIcon={<Add />}
            >
              Add
            </Button>
          </s.ButtonAddWrapper>
        )}
        onChangePage={onChangePage}
        options={{
          search: false,
          pageSize: 20,
          pageSizeOptions: [10, 20],
        }}
        columns={[
          { title: 'Id', field: 'id' },
          { title: 'Name', field: 'name' },
          { title: 'Address', field: 'address' },
          { title: 'Phone', field: 'phone' },
          {
            title: 'Create date',
            field: 'createdAt',
            type: 'date',
          },
          {
            title: 'Update date',
            field: 'updatedAt',
            type: 'date',
          },
        ]}
        totalCount={300}
        page={page}
        data={items.map(item => ({ ...item }))}
        // FUCK YOU author!~```1111`~ https://github.com/mbrn/material-table/issues/1371
        isLoading={isLoading}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit',
            onClick: (event, rowData: any) => {
              setInitialValuesForm(_pick(rowData, ['id', 'name', 'address', 'phone']));
              handleOpenPopup();
            },
          },
          {
            icon: 'delete',
            tooltip: 'Delete',
            onClick: (event, rowData: any) => onDelete(rowData.id),
          },
        ]}
      />
    </>
  );
};

export default Table;
