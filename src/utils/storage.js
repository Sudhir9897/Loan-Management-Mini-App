import usersData from '../data/users.json'
import loansData from '../data/loans.json'

export function initializeData(){
  if(!localStorage.getItem('lm_users')){
    localStorage.setItem('lm_users', JSON.stringify(usersData))
  }
  if(!localStorage.getItem('lm_loans')){
    localStorage.setItem('lm_loans', JSON.stringify(loansData))
  }
}
export function getUsers(){
  return JSON.parse(localStorage.getItem('lm_users') || '[]')
}
export function setUsers(users){
  localStorage.setItem('lm_users', JSON.stringify(users))
}
export function getLoans(){
  return JSON.parse(localStorage.getItem('lm_loans') || '[]')
}
