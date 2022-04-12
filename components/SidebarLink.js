import React from 'react'

const SidebarLink = ({ text, Icon, active }) => {
  return (
    <div
      className={`hoverAnimation ${
        active && 'font-bold'
      } flex items-center justify-center space-x-3 text-xl text-[#d9d9d9] xl:justify-start`}
    >
      <Icon className="h-7" />
      <span className="hidden xl:inline">{text}</span>
    </div>
  )
}

export default SidebarLink
