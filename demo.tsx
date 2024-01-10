import React, { useState } from "react";
import "./index.css";
import { Space, Switch, Table, Select, Tree } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";

interface DataType {
  key: React.ReactNode;
  level: string;
  name: string;
  zyname: string;
  auths: Array<any>;
  children?: DataType[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "权限层级",
    dataIndex: "level",
    key: "level",
    width: "20%",
  },
  {
    title: "权限名称",
    dataIndex: "name",
    key: "name",
    width: "20%",
  },
  {
    title: "权限资源名称",
    dataIndex: "zyname",
    key: "zyname",
    width: "20%",
  },
  {
    title: "拥有的权限树(按钮权限)",
    dataIndex: "auths",
    key: "auths",
    render: (text) => (
      <Tree
        showLine
        defaultExpandAll
        treeData={text}
        fieldNames={{
          title: "displayName",
          children: "childrens",
        }}
      />
    ),
  },
];

const data: DataType[] = [
  {
    key: 1,
    level: "功能权限/用户菜单",
    name: "整合的权限",
    zyname: "系统管理菜单",
    auths: [
      {
        displayName: "审计监控",
        childrens: [
          {
            displayName: "用户账号管理(新增,编辑,删除)",
          },
          {
            displayName: "用户在线管理(新增,编辑,删除)",
          },
          {
            displayName: "登录日志(新增,编辑,删除)",
          },
        ],
      },
      {
        displayName: "用户管理",
        childrens: [
          {
            displayName: "用户(新增,编辑,删除)",
          },
          {
            displayName: "职员管理",
          },
          {
            displayName: "职员用户管理(编辑)",
          },
        ],
      },
    ],
    children: [
      {
        key: 11,
        level: "",
        name: "管理员权限",
        zyname: "",
        auths: [
          {
            displayName: "用户管理",
            childrens: [
              {
                displayName: "用户(新增,编辑,删除)",
              },
              {
                displayName: "职员管理",
              },
              {
                displayName: "职员用户管理(编辑)",
              },
            ],
          },
        ],
      },
      {
        key: 12,
        level: "",
        name: "EAP审计监控",
        zyname: "",
        auths: [
          {
            displayName: "审计监控",
            childrens: [
              {
                displayName: "用户账号管理(新增,编辑,删除)",
              },
              {
                displayName: "用户在线管理(新增,编辑,删除)",
              },
              {
                displayName: "登录日志(新增,编辑,删除)",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    level: "数据权限/子系统",
    name: "EAP系统管理",
    zyname: "子系统",
    auths: [
      {
        displayName: "系统管理",
      },
    ],
  },
];

// rowSelection objects indicates the need for row selection
const rowSelection: TableRowSelection<DataType> = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const App: React.FC = () => {
  const [checkStrictly, setCheckStrictly] = useState(false);

  return (
    <>
      <Space align="center" style={{ marginBottom: 16 }}>
        张三拥有的权限：
        <Select
          defaultValue="1"
          style={{ width: 200 }}
          options={[
            { value: "1", label: "系统管理" },
            { value: "2", label: "万孚汇报管理系统" },
            { value: "3", label: "生产统计报表系统" },
          ]}
        />
      </Space>
      <Table
        columns={columns}
        // rowSelection={{ ...rowSelection, checkStrictly }}
        dataSource={data}
      />
    </>
  );
};

export default App;
