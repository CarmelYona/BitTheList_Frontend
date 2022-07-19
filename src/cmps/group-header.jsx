import { AiOutlineDelete } from 'react-icons/ai'
import { RiAddCircleLine } from 'react-icons/ri'
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { ReactComponent as TraingleSvg } from '../assets/svg/traingle.svg'
import { ReactComponent as NineDotsSvg } from '../assets/svg/ninedots.svg'

export function GroupHeader({ board, group, onUseBtn, onSaveGroup, onUpdateColumns, toggle, isBtnsModalOpen, onchangeColor, isChangeColor }) {
    return (
        <div className=" pulse-component-wrapper group-header-wrapper">
            <div className="pulse-component">
                <div className="title-container group-title-wrapper">
                    <div className="btn-pulse-menu-wrapper btn-group-menu-wrapper"
                        onClick={() => toggle('btns-modal')}>
                        <div className="btn-group-menu" style={{ backgroundColor: group.style }}><TraingleSvg /></div>
                    </div>
                    <div className="title-inner-container group-header">
                        <div className="title-inner-wrapper group-header">
                            <div className="cell-component title-cell group-header" >
                                <div className="title-cell-component group-header">
                                    <div className="drag-btn flex">
                                       <NineDotsSvg/>
                                    </div>
                                    <div className="title-cell-text name-column-header">
                                        <div className="title-component group-title-wrapper">
                                            <div
                                                suppressContentEditableWarning={true}
                                                contentEditable={true}
                                                onBlur={onSaveGroup}
                                                style={{ color: group.style }}
                                                className="group-title text-component"
                                            >
                                                {group.title && group.title}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cells-row-container">
                    <div className="cells-row-component">
                        {board.columns.map((column, idx) =>
                            <div className="cell-component-wrapper draggable" key={idx}>
                                <div className="cell-component-inner">
                                    <div
                                        className="cell-component group-column"
                                        suppressContentEditableWarning={true}
                                        onBlur={onUpdateColumns}
                                        contentEditable={true}
                                        title={column}

                                        idx={idx}>
                                        {column}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="column-wrapper-add header"><div className="btn-add-column">+</div>
                </div>
            </div>
            {
                isBtnsModalOpen &&
                <div className="btns-modal">
                    <div className="btns-top-modal">
                        <div className="btn-modal-top-section" onClick={() => onUseBtn('add')}><RiAddCircleLine />
                            <span> Add group</span>
                        </div>
                        <div className="btn-modal-top-section" onClick={() => onUseBtn('duplicate', group)}><HiOutlineDocumentDuplicate /> <span> Duplicate this group</span></div>
                        <div className="border"></div>
                    </div>
                    <div className="btns-bottom-modal">
                        <div className="btn-modal-color" onClick={() => onUseBtn('color', group)}> <div className="color-pick" style={{ backgroundColor: group.style }} ></div><span>Change group color</span></div>
                        {isChangeColor &&
                            <div className="color-pallete">
                                <div className="color-picker-wraper">
                                    {board.labels && board.labels.map((label, idx) => {
                                        return <div onClick={() => onchangeColor(label, group)} className="color-picker" key={idx} style={{ backgroundColor: label }}></div>
                                    })}
                                </div>
                            </div>

                        }
                        <div className="border"></div>
                        <div className="btn-modal-remove" onClick={() => onUseBtn('remove', group)}><AiOutlineDelete /> <span>Remove group</span> </div>
                    </div>
                </div>
            }
        </div >
    )
}