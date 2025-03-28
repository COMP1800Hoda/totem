import React from 'react';
import {IconMenu2} from '@tabler/icons-react';
import {DrawerContainer, HeaderContainer, Inner} from './Header.styled.ts';
import {COLORS} from '../../constants/colors.ts';
import {Menu} from "../menu/Menu.tsx";

interface HeaderSearchProps {
}

export const Header: React.FC<HeaderSearchProps> = () => {
  return (
    <>
      <HeaderContainer hideBorder={false}>
        <Inner>
          <a href="/main">
            <h1 style={{fontSize: 20}}>Totem</h1>
          </a>
          <IconMenu2
            color={COLORS.darkGray}
            size={24}
            stroke={1.5}
            role="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
          />
        </Inner>
      </HeaderContainer>

      <DrawerContainer
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasMenuLabel">Menu</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <Menu />
        </div>
      </DrawerContainer>
    </>
  );
};