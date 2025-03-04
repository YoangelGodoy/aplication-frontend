import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

import { AppSidebarNav } from './AppSidebarNav';

import logo from 'src/assets/images/logo3.png';
import '../scss/_custom.scss'
// sidebar nav config
import navigation from '../_nav';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible });
      }}
    >
      <CSidebarHeader>
      <div className="border-bottom-logo" style={{paddingBottom:"17px", paddingTop:"5x", display: "flex", alignItems: "center", justifyContent: "left", textAlign: "center"}}>
        <img className='logo' src={logo} alt="Logo" style={{ width: '100%', height: 'auto' }} />
      </div>  
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      
      <CSidebarFooter>
      <div className="border-top-logo" style={{paddingBottom:"1px", paddingTop:"15px", display: "flex", alignItems: "center", justifyContent: "left", textAlign: "center"}}>
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
        </div>
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);