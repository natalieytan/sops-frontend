import ManageSop from '../components/sop/ManageSop'
import CreateSop from '../components/sop/CreateSop'
import AddSopVersion from '../components/sop/AddSopVersion'
import EditSop from '../components/sop/EditSop'
import ManageUsers from '../components/user/ManageUsers'
import ViewUser from '../components/user/ViewUser'
import Register from '../components/auth/Register'
import ResetPassword from '../components/user/ResetPassword'

const adminRoutes = [
{
  path: '/managesop',
  component: ManageSop,
}, {
  path: '/manageusers',
  component: ManageUsers,
}, {
  path: '/register',
  component: Register,
}, {
  path: '/users/:id',
  component: ViewUser,
}, {
  path: '/sops/create',
  component: CreateSop,
}, {
  path: '/sops/:id',
  component: EditSop,
}, {
  path: '/sops/:id/addversion',
  component: AddSopVersion,
}, {
  path: '/users/:id/password',
  component: ResetPassword
}

];

export default adminRoutes