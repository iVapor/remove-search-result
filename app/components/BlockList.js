import React, { Component } from 'react'
import "./BlockList.css"
import {
    Table,
    Divider,
    Tag,
    message,
    Modal,
    Button,
    Input
} from 'antd';
import _ from "lodash"
import { log, refreshPage } from "../../utils/tools"
import {
    getBlockList,
    setBlockList,
    deleteBlockItem,
    modifyBlockItem,
} from "../../static/resource/blockList";

class BlockList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blockType: 'name',
            blockValue: '',
            currentType: 'siteName',
            list: [],

            modifyModalVisible: false,
            modifyRecord: {
                id: '',
                type: '',
                mark: '',
            },

        }

        this.bindFunction()
    }
    bindFunction() {
        this.handleCancel = this.handleCancel.bind(this)
        this.modifyRecord = this.modifyRecord.bind(this)
        this.changeModalData = this.changeModalData.bind(this)
    }
    addListKey(list) {
        list.forEach(item => item.key = item.id)
    }
    getList() {
        let p = getBlockList()
        p.then((list) => {
            this.addListKey(list)
            this.setState({
                list: list
            })
        })
    }
    componentDidMount() {
        this.getList()
    }
    deleteRecord(id) {
        deleteBlockItem(id, () => {
            message.success('删除成功')
            refreshPage()
        })
    }
    changeStatus(id, status) {
        let updateStatus = status === 1 ? 0 : 1
        let info = {
            id: id,
            status: updateStatus,
        }
        modifyBlockItem(info, () => {
            message.success('状态更新成功')
            refreshPage()
        })
    }
    modifyRecord() {
        let { modifyRecord } = this.state
        log('modifyRecord', modifyRecord)
        modifyBlockItem(modifyRecord, () => {
            message.success('修改成功')
            refreshPage()
        })
    }
    openModifyModal(id, type, mark) {
        let { modifyRecord } = this.state
        Object.assign(modifyRecord, {
            id: id,
            type: type,
            mark: mark,
        })
        log('modifyRecord', modifyRecord)
        this.setState({
            modifyRecord: modifyRecord,
            modifyModalVisible: true,
        })
    }
    handleCancel() {
        let { modifyRecord } = this.state
        Object.assign(modifyRecord, {
            id: '',
            type: '',
            mark: '',
        })
        log('modifyModalVisible, modifyRecord', modifyRecord)
        this.setState({
            modifyRecord: modifyRecord,
            modifyModalVisible: false,

        })
    }
    changeModalData(e) {
        let value = e.target.value
        let { modifyRecord } = this.state
        modifyRecord.mark = value
        this.setState({
            modifyRecord: modifyRecord,
        })
    }
    render() {
        const columns = [
            {
                title: '移除的站点',
                dataIndex: 'mark',
                key: 'mark',
                render: text => <span>{text}</span>,
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: status => {
                    let statusClass = status === 1 ? 'available' : 'disable'
                    let text = status === 1 ? '已启用' : '已禁用'
                    return <span>
                        <span className={'status-icon '+ statusClass}></span>{ text }
                    </span>
                },
            },
            {
                title: '移除方式',
                width: 100,
                dataIndex: 'type',
                key: 'type',
                render: (type) => {
                    let textList = {
                        url : '链接',
                        name : '网站名',
                    }
                    let color = type === 'url' ? '#9dd038' : '#3f82e5';
                    return (
                        <Tag color={color} >
                            { textList[type] }
                        </Tag>
                    );
                }
            },
            {
                title: '操作',
                key: 'action',
                render: (record) => {
                    let statueText = record.status === 1 ? '禁用' : '启用'
                    return (<span>
                        <a onClick={() => this.changeStatus(record.id, record.status)}>{ statueText }</a>
                        <Divider type="vertical" />
                        <a onClick={() => this.openModifyModal(record.id, record.type, record.mark)}>编辑</a>
                        <Divider type="vertical" />
                        <a onClick={() => this.deleteRecord(record.id)}>删除</a>
                    </span>)
                },
            },
        ]

        let inputWidth200 = {
            width: '200px'
        }

        let { list, modifyRecord } = this.state
        let modalText = modifyRecord.type === 'url' ? '链接：' : '网站名：'
        return <div className={"block-list"}>
            <h2>移除列表</h2>
            <Table dataSource={list} columns={columns}  pagination={false}/>
            <Modal
                title="编辑移除的站点"
                visible={this.state.modifyModalVisible}
                onOk={this.modifyRecord}
                onCancel={this.handleCancel}
                cancelText={"取消"}
                okText={"确定"}
            >
                <div>
                    <label className={"modify-label"}>{modalText}</label>
                    <Input style={ inputWidth200 } defaultValue={modifyRecord.mark}
                           onChange={ this.changeModalData }/>
                </div>
            </Modal>
        </div>
        }
}

export default BlockList
