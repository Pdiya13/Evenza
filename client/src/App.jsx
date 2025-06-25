<Router>
  <Toaster position="top-right" reverseOrder={false} />
  <Routes>

    <Route path='/' element={<Mainweb />} />
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />

    <Route element={<Layout />}>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/create' element={<CreateEvent />} />
      <Route path='/manage' element={<ManageEvent />} />
      <Route path='/vendors' element={<Vendors />} />
    </Route>

    <Route path='/manage/:id' element={<EventLayout />}>
      <Route path='budget' element={<BudgetManagement />} />
      <Route path='guests' element={<GuestManagement />} />
      <Route path='select-vendor' element={<SelectVendor />} />
      <Route path='checklist' element={<SmartChecklist />} />
    </Route>

    <Route element={<VendorLayout />}>
      <Route path='/vendor-checklist' element={<SmartChecklist1 />} />
      <Route path='/vendor-budget' element={<BudgetManagement1 />} />
      <Route path='/vendor-dashboard' element={<VendorDashboard />} />
      <Route path='/eventslist' element={<EventList />} />
      <Route path='/payments' element={<Payments />} />
      <Route path='/ratings' element={<Ratings />} />
    </Route>
  </Routes>
</Router>
