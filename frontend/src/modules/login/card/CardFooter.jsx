import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const CardFooter = () => {
  const { t } = useTranslation()

  return (
    <div className="text-center">
      <span className="m-2 pt-2">{t('auth.NoAccount')}</span>
      <Link to="/signup">{t('auth.registration')}</Link>
    </div>
  )
}
