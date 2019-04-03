import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import TodoList from '../components/todo/TodoList';
import TodoListForm from '../components/todo/TodoListForm';
import UserList from '../components/user/UserList';

class AdminDashboard extends Component {

  render() {
    return(
      <div className="container admin-dashboard-wrapper">
        <h1 className="h2 page-title">Admin Dashboard</h1>
          <Tabs>
            <TabList>
              <Tab>Todos</Tab>
              <Tab>Users</Tab>
            </TabList>

            <TabPanel>
              <TodoList />
            </TabPanel>
            <TabPanel>
              <UserList />
            </TabPanel>
          </Tabs>

      </div>
    )
  }
}


export default (AdminDashboard);
