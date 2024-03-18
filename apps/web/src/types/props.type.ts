import { ISelectedAddress } from './address.type';
import { IJournals } from './journal.type';
import { IProduct } from './product.type';
import { ITransaction } from './transaction.type';
import { FormikProps } from 'formik';

export interface IProductDetailProps {
  product: IProduct | null;
}

export interface IPaymentSuccessProps {
  transactionStatus: string;
  transactionId: string;
}

export interface IOrderStatusProps {
  transaction: ITransaction | null;
  createdAt: string;
  getTransactionById: () => void;
  updateStatus: (input: number) => void;
}

export interface ICountdownTimerProps {
    orderId: string;
}

export interface IDropzoneProps {
  className: string
  transactionId: string
  getTransactionById : () => void
}

export interface IModalBankTransferProps {
  openModal: boolean;
  setOpenModal: (input: boolean) => void;
}

export interface IModalConfirmOrderCancelProps {
  openCancel: boolean;
  setOpenCancel: (input: boolean) => void;
  updateStatus: (input: number) => void;
}

export interface IModalConfirmOrderReceivedProps {
  openConfirm: boolean;
  setOpenConfirm: (input: boolean) => void;
  updateStatus: (input: number) => void;
}

export interface IOrderHistoryProps {
  transactionId: string;
  setTransactionId: (input: string) => void;
  setSubmit: (input: any) => void;
  datepickerRef: any;
  selectedDate: Date;
  setSelectedDate: (input: Date) => void;
  handleIconClick: () => void;
  transactions: ITransaction[];
  setPage: (input: number) => void;
  totalPage: number
  itemPerPage: number;
  transactionByDate: ITransaction[];
  setPageOfDate: (input: number) => void;
}

export interface IPaginationProps {
  data: ITransaction[];
  setPage: (input: number) => void;
  totalPage: number;
  itemPerPage: number;
}

export interface IPaginationDateProps {
  data: ITransaction[];
  setPageOfDate: (input: number) => void;
  totalPage: number;
  itemPerPage: number;
}

interface LoginFormValues {
  usernameOrEmail: string;
  password: string;
}

export interface LoginProps {
  formik: FormikProps<LoginFormValues>;
}

export interface ISelectAddressProps {
  selectedAddress?: ISelectedAddress | null
  setSelectedAddress: (input: ISelectedAddress) => void
}

export interface IBranchServiceProps {
  branchName: string;
  address: string;
  distance: string;
}

export interface IPaymentMethodProps {
  handlePay: () => void;
  handlePaymentByManual: () => void;
}

export interface IJournalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface IJournalPaginationProps {
  data: IJournals[];
  setPage: (input: number) => void;
  totalPage: number;
  itemPerPage: number;
}

export interface IModalShowReasonProps {
  openModal: boolean;
  setOpenModal: (input: boolean) => void;
  reason: string;
}

export interface INavbarAdminProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ISidebarAdminProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface IOrderPageProps {
  isOpen: boolean;
  onClose: () => void
}

export interface IPaginationManageOrderProps {
  data: ITransaction[];
  setPage: (input: number) => void;
  totalPage: number;
  itemPerPage: number;
  setUpdate: (input: boolean) => void;
}

export interface IModalTransactionDetailProps {
  openModal: boolean,
  setOpenModal: (input: boolean) => void
  transaction: ITransaction | null
  setOpen: (input: boolean) => void
  setAccept: (input: boolean) => void
  setDecline: (input: boolean) => void
  setOpenSent: (input: boolean) => void
  setCancel: (input: boolean) => void
}

export interface IModalPaymnetProofProps {
  open: boolean;
  setOpen: (input: boolean) => void;
  transaction: ITransaction | null;
}

export interface IModalCancelReasonProps {
  cancel: boolean;
  setCancel: (input: boolean) => void;
  reason: string;
  handleReasonChange: (input: any) => void;
  setTransactionId: (input: string) => void;
  transaction: ITransaction | null;
  updateStatus: (input: number) => void;
  setOpenModal: (input: boolean) => void;
}

export interface IModalConfirmPaymentValidProps {
  accept: boolean;
  setAccept: (input: boolean) => void;
  setTransactionId: (input: string) => void;
  transaction: ITransaction | null;
  updateStatus: (input: number) => void;
  setOpenModal: (input: boolean) => void;
}

export interface IModalConfirmPaymentInvalidProps {
  decline: boolean;
  setDecline: (input: boolean) => void;
  setTransactionId: (input: string) => void;
  transaction: ITransaction | null;
  updateStatus: (input: number) => void;
  setOpenModal: (input: boolean) => void;
}

export interface IModalConfirmShipmentProps {
  openSent: boolean;
  setOpenSent: (input: boolean) => void;
  setTransactionId: (input: string) => void;
  transaction: ITransaction | null;
  updateStatus: (input: number) => void;
  setOpenModal: (input: boolean) => void;
}