import React, { useEffect } from 'react';
import { IconMenu2 } from '@tabler/icons-react';
import { DrawerContainer, HeaderContainer, Inner } from './Header.styled.ts';
import { COLORS } from '../../constants/colors.ts';
import { Menu } from '../menu/Menu.tsx';
import { useLocation } from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
interface HeaderSearchProps {}

export const Header: React.FC<HeaderSearchProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const openedOffcanvas = document.querySelector('.offcanvas.show');
    if (openedOffcanvas) {
      //@ts-ignore
      const bsOffcanvas = Offcanvas?.getInstance?.(openedOffcanvas);
      bsOffcanvas?.hide();
    }

    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = 'unset';
  }, [location.pathname]);

  return (
    <>
      <HeaderContainer hideBorder={false}>
        <Inner>
          <h1 onClick={() => navigate('/main')} style={{ fontSize: 20 }}>
            Totem
          </h1>
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
          <h5 className="offcanvas-title" id="offcanvasMenuLabel">
            Menu
          </h5>
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
