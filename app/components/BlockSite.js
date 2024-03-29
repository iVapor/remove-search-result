import React, { Component } from 'react'
import "./BlockSite.css"
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    Radio,
    message
} from 'antd';
import _ from "lodash"
import { log, refreshPage } from "../../utils/tools"
import { getBlockList, setBlockList } from "../../static/resource/blockList";

const { Option } = Select

class BlockSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blockType: 'name',
            blockValue: '',
            currentType: 'siteName',
            siteSuffix: '.com',
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.selectMethod = this.selectMethod.bind(this)
        this.showBlockElement = this.showBlockElement.bind(this)
        this.changeSiteSuffix = this.changeSiteSuffix.bind(this)
    }
    saveSiteName(name) {
        let format = {
            type: 'name',
            className: 'nor-src-wrap',
            mark: name,
            status: 1,
        }
        setBlockList(format, () => {
            message.success('保存成功！')
            refreshPage()
        })
    }
    saveSiteUrl(url) {
        let format = {
            type: 'url',
            className: 'nor-src-wrap',
            mark: url,
            status: 1,
        }
        setBlockList(format, () => {
            message.success('保存成功!')
            refreshPage()
        })
    }
    saveBlock(data) {
        let { blockMethod, siteName, siteUrl } = data
        let { siteSuffix } = this.state
        let completeUrl = `${ siteUrl }${ siteSuffix }`
        let saveMethod = {
            siteName: this.saveSiteName,
            siteUrl: this.saveSiteUrl,
        }
        let param = {
            siteName: siteName,
            siteUrl: siteUrl,
        }
        let handler = saveMethod[blockMethod]
        handler(param[blockMethod])
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.saveBlock(values)
            }
        });
    }

    selectMethod(event) {
        let target = event.target.value
        this.setState({
            currentType: target
        }, () => {
            this.props.form.validateFields([target], { force: true });
        })
    }

    changeSiteSuffix(suffix) {
        this.setState({
            siteSuffix: suffix
        })
    }

    showBlockElement() {
        const { getFieldDecorator } = this.props.form
        let inputWidth200 = {
            width: '200px'
        }
        let inputWidth400 = {
            width: '400px'
        }

        const selectAfter = (
            <Select defaultValue=".com" style={{ width: 80 }} onChange={ this.changeSiteSuffix }>
                <Option value=".com">.com</Option>
                <Option value=".cn">.cn</Option>
                <Option value=".jp">.jp</Option>
                <Option value=".us">.us</Option>
                <Option value=".org">.org</Option>
            </Select>
        )

        let { currentType } = this.state
        let siteNameElement = (<Form.Item label="网站名：">
            {getFieldDecorator('siteName', {
                rules: [
                    {
                        // required: currentType === 'siteName',
                        message: '请输入网站名！',
                    },
                ],
            })(<Input style={inputWidth200} placeholder={"请输入要移除的网站名"} />)}
        </Form.Item>)

        let siteUrlElement = (<Form.Item label="网址：">
            {getFieldDecorator('siteUrl', {
                rules: [
                    {
                        // required: currentType === 'siteUrl',
                        message: '请输入网址！',
                    },
                ],
            })(<Input addonAfter={selectAfter}
                      style={inputWidth400} placeholder={"请输入要移除的网址"} />)}
        </Form.Item>)

        let blockTypeList = {
            siteName: siteNameElement,
            siteUrl: siteUrlElement
        }

        return blockTypeList[currentType] || ''
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        let blockTypeElement = this.showBlockElement()
        let tips = '提交成功后，需要关闭弹窗，刷新当前网页。移除才会生效。'
        return <div className="block-site">
            <h2>移除百度</h2>
            <section>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="移除方式：">
                        {getFieldDecorator('blockMethod',  {
                            rules: [
                                {
                                    // required: true,
                                    message: '请选择移除方式！',
                                },
                            ],
                        })(
                            <Radio.Group onChange={this.selectMethod}>
                                <Radio value="siteName">网站名</Radio>
                                <Radio value="siteUrl">网址</Radio>
                            </Radio.Group>,
                        )}
                    </Form.Item>

                    { blockTypeElement }

                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}
                               help={tips}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item >
                </Form>
            </section>
        </div>
    }
}


const BlockSiteForm = Form.create({ name: 'block-site-form' })(BlockSite);
export default BlockSiteForm
