import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Typography, Button, Modal, Input, Popconfirm, notification } from 'antd';
import uuid from 'uuid';

import {
  loadDictionaryAction,
  addDictionaryPairAction,
  removeDictionaryPairAction,
  toggleEditDictionaryPairAction,
  editDictionaryPairAction,
  cancelEditDictionaryPairAction,
  saveDictionaryPairAction,
} from '../../modules/dictionary/actions';
import { dictionary, dictionaries, editState } from '../../modules/dictionary/selectors';
import {
  IDictionaryPair,
  IDictionaryListItem,
  ConsistencyIssues,
} from '../../modules/dictionary/types';
import { NoMatch } from '../';

import { formatError } from './helpers';

import styles from './Dictionary.module.css';

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
  const currentEditState = useSelector(editState);
  const [newDictionaryPair, setNewDictionaryPair] = useState(initialDictPair());
  const [dictPairForm, setDictPairForm] = useState(false);

  const currentDict = dicts.find((dict) => dict.id === match.params.id);

  useEffect(() => {
    const id = match.params.id;
    dispatch(loadDictionaryAction(id));
  }, [match, dispatch]);

  const handleAddDictionaryPair = () => {
    if (currentDict) {
      if (newDictionaryPair.domain !== '' && newDictionaryPair.range !== '') {
        dispatch(
          addDictionaryPairAction({
            dict: currentDict,
            pair: newDictionaryPair,
          })
        );
      } else {
        notification['error']({
          message: 'Error',
          description: 'Pair values can not be empty strings',
        });
      }
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

  const handleEditDictionaryPair = (id: string) => {
    dispatch(toggleEditDictionaryPairAction(id));
  };

  const columns = [
    {
      title: 'Domain',
      dataIndex: 'domain',
      key: 'domain',
      render: (text: string, record: IDictionaryListItem) => {
        const currentDictPair = currentEditState.find((pair) => pair.id === record.id);
        return (
          <React.Fragment>
            {record.editMode && currentDictPair ? (
              <Row>
                <Col span={12}>
                  <Input
                    value={currentDictPair.domain}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        editDictionaryPairAction({
                          id: currentDictPair.id,
                          domain: event.target.value,
                          range: currentDictPair.range,
                        })
                      );
                    }}
                  />
                </Col>
              </Row>
            ) : (
              <span>{text}</span>
            )}
          </React.Fragment>
        );
      },
    },
    {
      title: 'Range',
      dataIndex: 'range',
      key: 'range',
      render: (text: string, record: IDictionaryListItem) => {
        const currentDictPair = currentEditState.find((pair) => pair.id === record.id);
        return (
          <React.Fragment>
            {record.editMode && currentDictPair ? (
              <Row>
                <Col span={12}>
                  <Input
                    value={currentDictPair.range}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        editDictionaryPairAction({
                          id: currentDictPair.id,
                          domain: currentDictPair.domain,
                          range: event.target.value,
                        })
                      );
                    }}
                  />
                </Col>
              </Row>
            ) : (
              <span>{text}</span>
            )}
          </React.Fragment>
        );
      },
    },
    {
      title: 'Errors',
      key: 'errors',
      dataIndex: 'errors',
      render: (errors: ConsistencyIssues[]) => (
        <React.Fragment>
          {errors.map((error) => (
            <span>{formatError(error.replace('dictionary/', '').toLowerCase())}</span>
          ))}
        </React.Fragment>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: IDictionaryListItem) => {
        const currentEditPair = currentEditState.find((pair) => pair.id === record.id);
        return (
          <React.Fragment>
            {record.editMode ? (
              <Row>
                <Button
                  className={styles.firstButton}
                  size="small"
                  onClick={() => {
                    if (currentEditPair && currentDict) {
                      if (currentEditPair.domain !== '' && currentEditPair.range !== '') {
                        dispatch(
                          saveDictionaryPairAction({
                            ...currentEditPair,
                            dictId: currentDict.id,
                          })
                        );
                      } else {
                        notification['error']({
                          message: 'Error',
                          description: 'Pair values can not be empty strings',
                        });
                      }
                    }
                  }}
                >
                  Save
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    dispatch(cancelEditDictionaryPairAction(record.id));
                  }}
                >
                  Cancel
                </Button>
              </Row>
            ) : (
              <Row>
                <Button
                  className={styles.firstButton}
                  size="small"
                  onClick={() => {
                    handleEditDictionaryPair(record.id);
                  }}
                >
                  Edit
                </Button>
                <Popconfirm
                  title={`Are you sure you want to delete the pair '${record.domain}, ${record.range}'`}
                  onConfirm={() =>
                    handleDeleteDictionaryPair({
                      id: record.id,
                      domain: record.domain,
                      range: record.range,
                    })
                  }
                  okText="Yes"
                  cancelText="No"
                >
                  <Button size="small" type="danger">
                    Delete
                  </Button>
                </Popconfirm>
              </Row>
            )}
          </React.Fragment>
        );
      },
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
        <NoMatch />
      )}
    </React.Fragment>
  );
};

export { Dictionary };
