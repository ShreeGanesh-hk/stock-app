import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../views/home'

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />}>
                {/* punlic routes */}
                {/* <Route path="/" element={<Navigate to="/analytics" replace />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="unauthorized" element={<Unauthorized />} /> */}

                {/* protected routes */}
                {/* <Route element={<RequireAuth allowedRoles={[Roles.admin]} />}>
        <Route path="users" element={<UserManagement />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={[Roles.editor, Roles.admin]} />}>
        <Route path="books" element={<BookManagement />} />
      </Route>
      <Route path="*" element={<Missing />} /> */}

            </Route>
        </Routes>
    )
}

export default AppRouter