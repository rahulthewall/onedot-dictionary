import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, Typography, Row, Col, Button, Modal, Input, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import uuid from 'uuid';

import { dictionaries } from '../../modules/dictionary/selectors';
import { addDictionaryAction, removeDictionaryAction } from '../../modules/dictionary/actions';
import { IDictionary } from '../../modules/dictionary/types';

const Dictionaries: React.FC = () => {
  const [addDictionary, setAddDictionary] = useState(false);
  const [dictionaryName, setDictionaryName] = useState('');
  const dicts = useSelector(dictionaries);
  const dispatch = useDispatch();

  const handleAddDictionary = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(
      addDictionaryAction({
        name: dictionaryName,
        id: uuid.v4(),
      })
    );
    setAddDictionary(false);
    setDictionaryName('');
  };

  const handleDeleteDictionary = (item: IDictionary) => {
    dispatch(removeDictionaryAction(item));
  };

  const ListHeaderComponent = (
    <Row type="flex" justify="space-between" align="middle">
      <Col span={8}>
        <Typography.Title level={2}>List of Dictionaries</Typography.Title>
      </Col>
      <Col span={4}>
        <Button onClick={() => setAddDictionary(true)}>Add Dictionary</Button>
        <Modal
          title="Add Dictionary"
          visible={addDictionary}
          onCancel={() => setAddDictionary(false)}
          onOk={handleAddDictionary}
        >
          <Input
            placeholder="Dictionary Name"
            value={dictionaryName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDictionaryName(event.target.value)
            }
          />
        </Modal>
      </Col>
    </Row>
  );

  return (
    <React.Fragment>
      <Row type="flex" justify="center">
        <Col span={12}>
          <List
            bordered
            header={ListHeaderComponent}
            dataSource={dicts}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta title={<Link to={`/dictionary/${item.id}`}>{item.name}</Link>} />
                <Popconfirm
                  title={`Are you sure you want to delete the dictionary '${item.name}'`}
                  onConfirm={() => handleDeleteDictionary(item)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="danger" size="small">
                    Delete
                  </Button>
                </Popconfirm>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export { Dictionaries };
