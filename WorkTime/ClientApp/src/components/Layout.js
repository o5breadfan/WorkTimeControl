import React from 'react';
import {Outlet} from 'react-router-dom';
import { Container } from 'reactstrap';
import  NavMenu from './NavMenu';
import {Breadcrumb} from "react-bootstrap";
import useBreadcrumbs from "use-react-router-breadcrumbs";

export default function Layout() {
    const breadcrumbs = useBreadcrumbs();
    
    return (
        <div>
            <NavMenu />
            <Container>
                <Breadcrumb>
                    {breadcrumbs.map(({ match, breadcrumb}) => (
                        <Breadcrumb.Item key={match.pathname} href={match.pathname}>{breadcrumb}</Breadcrumb.Item>
                    ))}
                </Breadcrumb>
                <Outlet />
            </Container>
        </div>
    );
};
