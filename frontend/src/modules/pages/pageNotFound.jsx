import { useTranslation } from 'react-i18next'

export const NotFound = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h1 className="text-center mt-5">{t('notFound')}</h1>
    </div>
  )
}
