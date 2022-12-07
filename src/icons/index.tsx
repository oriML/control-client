import React from 'react'
import { BiLogOutCircle } from 'react-icons/bi'
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai'
import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi'
import { HiHome, HiDocumentText, HiDocumentAdd } from 'react-icons/hi'
import { ImProfile, ImTable } from 'react-icons/im'
import { RiFileEditLine } from 'react-icons/ri'
import { MdOutlineDelete } from 'react-icons/md'
import { GrCircleAlert } from 'react-icons/gr'
import { IoMdCloseCircle } from 'react-icons/io'

export const ICON_SIZE_XLARGE = 32;

export const ICON_SIZE_LARGE = 24;

export const ICON_SIZE_MEDIUM = 20;

export const ICON_SIZE_SMALL = 18;

export const LogoutIcon = () => <BiLogOutCircle size={ICON_SIZE_LARGE} />;

export const OpenMenuIcon = () => <AiOutlineCaretLeft size={ICON_SIZE_LARGE} />;

export const CloseMenuIcon = () => <AiOutlineCaretRight size={ICON_SIZE_SMALL} />;

export const MenuRowMainIcon = () => <HiHome size={ICON_SIZE_LARGE} />;

export const MenuRowAddMovementIcon = () => <HiDocumentAdd size={ICON_SIZE_LARGE} />;

export const MenuRowIncomesIcon = () => <GiReceiveMoney size={ICON_SIZE_LARGE} />;

export const MenuRowOutcomesIcon = () => <GiPayMoney size={ICON_SIZE_LARGE} />;

export const MenuRowTemplatesIcon = () => <HiDocumentText size={ICON_SIZE_LARGE} />;

export const MenuRowProfileIcon = () => <ImProfile size={ICON_SIZE_SMALL} />;

export const MovementsPageTitleIcon = () => <ImTable size={ICON_SIZE_XLARGE} />;

export const EditMovementIcon = () => <RiFileEditLine size={ICON_SIZE_MEDIUM} />;

export const DeleteMovementIcon = () => <MdOutlineDelete size={ICON_SIZE_MEDIUM} />;

export const CloseIcon = () => <IoMdCloseCircle size={ICON_SIZE_XLARGE} />;

export const AlertIcon = ({ size }: { size: number }) => <GrCircleAlert size={size} />;

export default {}