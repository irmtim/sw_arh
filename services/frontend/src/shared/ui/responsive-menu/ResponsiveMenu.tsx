import clsx from "clsx";
import { FC } from "react";
import { ResponsiveMenuItemModel } from "./_models";
import { KTSVG } from "shared";

type Props = {
  items: ResponsiveMenuItemModel[]
  menuIconCssClass: string
  menuButtonCssClass?: string
}

const menuDisplay = 'd-md-none'//''
const buttonsDisplay = 'd-none d-md-inline'//'d-none'

const ResponsiveMenu: FC<Props> = ({items, menuIconCssClass, menuButtonCssClass}) => {

  return (
    <>
      <button className={clsx("btn btn-icon btn-color-gray-400 btn-active-color-primary", menuButtonCssClass, menuDisplay)} 
				data-kt-menu-trigger="click" 
				data-kt-menu-placement="bottom-end" 
				data-kt-menu-flip="top-end">
					<KTSVG path="/media/icons/duotune/general/gen023.svg" className={clsx("svg-icon svg-icon-gray-300", menuIconCssClass)} />
			</button>
      {/* begin::Menu */}
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-200px'
        data-kt-menu='true'
      >
				{/*begin::Menu item*/}
	 			<div className="menu-item px-3">
	 				<div className="menu-content fs-6 text-dark text-start fw-bolder px-3 py-4">Действия</div>
	 			</div>
	 			{/*end::Menu item*/}
	 			{/*begin::Menu separator*/}
	 			<div className="separator mb-3 opacity-75"></div>
	 			{/*end::Menu separator*/}
        {items.map((item, index) => (
          <div key={`menu-${index}`} className='menu-item px-3 mb-3'>
            <span role={'button'} onClick={item.clickAction} className="menu-link px-3">
              {item.name}
            </span>
          </div>
        ))}
      </div>
      {/* end::Menu */}
      <div className={buttonsDisplay}>
        {items.map((item, index) => (
          <button 
            key={`btn-menu-${index}`}
            type={'button'} 
            className={clsx(`btn btn-sm ms-2 btn-icon btn-light-${item.color}`, menuButtonCssClass)}
            onClick={item.clickAction}
            data-bs-toggle="tooltip" 
            data-bs-placement="top" 
            title={item.name}>
            <KTSVG path={item.icon} className={clsx(`svg-icon`, item.iconCssClass)} />
          </button>
        ))}
      </div>
    </>
  );
};

export {ResponsiveMenu}