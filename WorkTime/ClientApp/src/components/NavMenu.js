import React, { useState } from 'react';
import {Badge, Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import './NavMenu.scss';
import  logo  from "../images/logo2.png";
import {Button, NavDropdown} from "react-bootstrap";
import { useAuth } from './hooks/useAuth';
import authService from '../services/authService';

export default function NavMenu() {

  const [isCollapsed, setCollapsed] = useState(true);
  const {signout} = useAuth();
  const navigate = useNavigate();

  const onClickSignOut = () => {
    authService.logout()
      .then(result => signout(() => navigate('/')))
  }

  const toggleNavbar = () => {
    setCollapsed(!isCollapsed);
  }

    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/"><img src={logo}  alt={"logo"} style={{width: 200}}/></NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!isCollapsed} navbar>
              <ul className="navbar-nav flex-grow">
                  <NavItem>
                    <NavLink tag={Link} to="/request/list">Заявки</NavLink>
                  </NavItem>  
                <NavItem>
                  <NavLink tag={Link} to="/working-calendar">Рабочий график</NavLink>
                </NavItem>
                <NavItem>
                  <NavDropdown title="Настройки" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/personal-data">Личный кабинет</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/statistics">Статистика</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/user/list">Пользователи</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/department/list">Отделы</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Button} onClick={onClickSignOut}>Выйти</NavDropdown.Item>
                  </NavDropdown>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }