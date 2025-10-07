import { toast } from 'react-toastify'

export const notifySuccess = text =>
  toast.success(text, {
    closeOnClick: true,
  })

export const notifyError = text =>
  toast.error(text, {
    closeOnClick: true,
  })
