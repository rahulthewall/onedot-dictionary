import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Typography, Button, Modal, Input } from 'antd';
import uuid from 'uuid';

import {
  loadDictionaryAction,
  addDictionaryPairAction,
  removeDictionaryPairAction,
} from '../../modules/dictionary/actions';
import { dictionary, dictionaries } from '../../modules/dictionary/selectors';
import { IDictionaryPair, IDictionaryListItem } from '../../modules/dictionary/types';

interface IMatchParams {
  id: string;
}

const initialDictPair = (): IDictionaryPair => ({
  id: uuid.v4(),
  domain: '',
  range: '',
});

const Dictionary: React.FC<RouteComponentProps<IMatchParams>> = ({
  match,
}: RouteComponentProps<IMatchParams>) => {
  const dispatch = useDispatch();
  const dictPairs = useSelector(dictionary);
  const dicts = useSelector(dictionaries);
  const [newDictionaryPair, setNewDictionaryPair] = useState(initialDictPair());
  const [dictPairForm, setDictPairForm] = useState(false);

  const currentDict = dicts.find((dict) => dict.id === match.params.id);

  useEffect(() => {
    const id = match.params.id;
    dispatch(loadDictionaryAction(id));
  }, [match, dispatch]);

  const handleAddDictionaryPair = (event: React.MouseEvent<HTMLElement>) => {
    if (currentDict) {
      dispatch(
        addDictionaryPairAction({
          dict: currentDict,
          pair: newDictionaryPair,
        })
      );
    }
    setNewDictionaryPair(initialDictPair());
    setDictPairForm(false);
  };

  const handleDeleteDictionaryPair = (pair: IDictionaryPair) => {
    if (currentDict) {
      dispatch(
        removeDictionaryPairAction({
          dict: currentDict,
          pair,
        })
      );
    }
  };

  const columns = [
    {
      title: 'Domain',
      dataIndex: 'domain',
      key: 'domain',
    },
    {
      title: 'Range',
      dataIndex: 'range',
      key: 'range',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: IDictionaryListItem) => (
        <Row>
          <Col span={3}>
            <Button size="small">Edit</Button>
          </Col>
          <Col span={3} offset={1}>
            <Button
              size="small"
              type="danger"
              onClick={(event: React.MouseEvent<HTMLElement>) =>
                handleDeleteDictionaryPair({
                  id: record.id,
                  domain: record.domain,
                  range: record.range,
                })
              }
            >
              Delete
            </Button>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <React.Fragment>
      {currentDict ? (
        <Row type="flex" justify="center">
          <Col span={12}>
            <Row type="flex" justify="space-between" align="middle">
              <Col span={8}>
                <Typography.Title level={2}>{currentDict.name}</Typography.Title>
              </Col>
              <Col span={3}>
                <Button onClick={() => setDictPairForm(true)}>Add Pair</Button>
                <Modal
                  title="Add Dictionary Pair"
                  visible={dictPairForm}
                  onCancel={() => setDictPairForm(false)}
                  onOk={handleAddDictionaryPair}
                >
                  <Row type="flex" justify="space-between">
                    <Col span={10}>
                      <Input
                        placeholder="Domain"
                        value={newDictionaryPair.domain}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                          setNewDictionaryPair({
                            ...newDictionaryPair,
                            domain: event.target.value,
                          })
                        }
                      />
                    </Col>
                    <Col span={10}>
                      <Input
                        placeholder="Range"
                        value={newDictionaryPair.range}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                          setNewDictionaryPair({
                            ...newDictionaryPair,
                            range: event.target.value,
                          })
                        }
                      />
                    </Col>
                  </Row>
                </Modal>
              </Col>
            </Row>
            <Table dataSource={dictPairs} columns={columns} />
          </Col>
        </Row>
      ) : (
        <div>Not found</div>
      )}
    </React.Fragment>
  );
};

export { Dictionary };
