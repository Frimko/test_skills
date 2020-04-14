import React from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';

import TransitionsModal from 'ui/pages/formikTest/modal';

import * as s from './table.style';

type GetAllItemsReturnItemType = {
  id: number,
  name: string,
  address: string,
  phone: string,
  createdAt: string,
  updatedAt: string,
};
type TablePropsType = {
  onChangePage: (page: number) => Promise<any>,
  onAdd?: () => void,
  // onUpdate?: () => void,
  // onDelete?: () => void,
  page?: number,
  isLoading?: boolean,
  items: GetAllItemsReturnItemType[]
};

const Table: React.FC<TablePropsType> = ({
  items,
  onChangePage,
  isLoading,
  page = 0,
}) => {
  const [isOpen, onOpenPopup] = React.useState(false);

  const handleOpenPopup = () => onOpenPopup(false);

  return (
    <>
      <TransitionsModal isOpen={isOpen} onClose={handleOpenPopup} />
      <MaterialTable
        title={(
          <s.ButtonAddWrapper>
            <Button
              onClick={() => onOpenPopup(true)}
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
        data={items}
        isLoading={isLoading}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit',
            onClick: (event, rowData: any) => alert(`You saved ${rowData.name}`),
          },
          {
            icon: 'delete',
            tooltip: 'Delete',
            onClick: (event, rowData: any) => alert(`You want to delete ${rowData.name}`),
          },
        ]}
      />
    </>
  );
};

export default Table;
