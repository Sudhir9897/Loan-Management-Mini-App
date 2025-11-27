import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { getLoans } from '../utils/storage'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [loans, setLoans] = useState([])
  const [filtered, setFiltered] = useState([])

  // filters
  const [q, setQ] = useState('')
  const [loanType, setLoanType] = useState('')
  const [status, setStatus] = useState('')
  const [city, setCity] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  // pagination
  const [page, setPage] = useState(1)
  const pageSize = 5
  const totalPages = Math.ceil(filtered.length / pageSize)
  const paginatedData = filtered.slice((page - 1) * pageSize, page * pageSize)

  useEffect(() => {
    const data = getLoans()
    setLoans(data)
    setFiltered(data)
  }, [])

  useEffect(() => {
    applyFilters()
    setPage(1)     // reset to first page when filters change
  }, [q, loanType, status, city, fromDate, toDate, loans])

  const unique = (key) => Array.from(new Set(loans.map(l => l[key]).filter(Boolean)))

  function applyFilters() {
    let res = [...loans]
    if (q) res = res.filter(r => r.customerName.toLowerCase().includes(q.toLowerCase()))
    if (loanType) res = res.filter(r => r.loanType === loanType)
    if (status) res = res.filter(r => r.status === status)
    if (city) res = res.filter(r => r.city === city)
    if (fromDate) res = res.filter(r => r.applicationDate >= fromDate)
    if (toDate) res = res.filter(r => r.applicationDate <= toDate)
    setFiltered(res)
  }

  const handleLogout = () => {
    logout()
    toast.info('Logout successful')
    navigate('/')
  }

  const nextPage = () => page < totalPages && setPage(page + 1)
  const prevPage = () => page > 1 && setPage(page - 1)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Welcome, {user?.name}</h3>
        <button className="btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* FILTERS */}
      <div className="filters" style={{ marginTop: 12 }}>
        <input className="input" placeholder="Search by customer name" value={q} onChange={e => setQ(e.target.value)} />
        <select className="input" value={loanType} onChange={e => setLoanType(e.target.value)}>
          <option value="">All Loan Types</option>
          {unique('loanType').map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        <select className="input" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">All Status</option>
          {unique('status').map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        <select className="input" value={city} onChange={e => setCity(e.target.value)}>
          <option value="">All Cities</option>
          {unique('city').map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        <input className="input" type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
        <input className="input" type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
      </div>

      {/* TABLE */}
      <table className="table">
        <thead>
          <tr>
            <th>Customer</th><th>Loan ID</th><th>Type</th><th>Amount</th>
            <th>Status</th><th>City</th><th>Application Date</th>
            <th>Disbursal</th><th>EMI Due</th><th>Time</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? paginatedData.map(r => (
            <tr key={r.id}>
              <td>{r.customerName}</td>
              <td>{r.loanId}</td>
              <td>{r.loanType}</td>
              <td>₹{r.amount.toLocaleString('en-IN')}</td>
              <td>{r.status}</td>
              <td>{r.city}</td>
              <td>{r.applicationDate}</td>
              <td>{r.disbursalDate || '-'}</td>
              <td>{r.emiDueDate || '-'}</td>
              <td>{r.time}</td>
            </tr>
          )) : (
            <tr><td colSpan="10" style={{ textAlign: "center" }}>No records found</td></tr>
          )}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 16 }}>
        <button className="btn" disabled={page === 1} onClick={prevPage}>Prev</button>
        <span style={{ fontWeight: "bold" }}>Page {page} / {totalPages || 1}</span>
        <button className="btn" disabled={page === totalPages || totalPages === 0} onClick={nextPage}>Next</button>
      </div>

      <div style={{ marginTop: 8 }} className="small">
        Showing {paginatedData.length} of {filtered.length} filtered records
      </div>
    </div>
  )
}
