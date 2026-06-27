import { useNavigate } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'

function RegisterPage() {
  const navigate = useNavigate()

  return (
    <div className="max-w-md mx-auto px-8 py-16">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">Unite a De Casa</h2>
      <p className="text-gray-500 text-center mb-8">Queres comer o queres cocinar?</p>
      <div className="bg-white border-2 border-orange-200 rounded-2xl p-8 shadow-sm">
        <RegisterForm />
      </div>
      <p className="text-center text-gray-500 text-sm mt-6">
        Ya tenes cuenta?{' '}
        <span onClick={() => navigate('/login')} className="text-orange-600 font-semibold cursor-pointer underline">
          Ingresa aca
        </span>
      </p>
    </div>
  )
}

export default RegisterPage
