import React from 'react'
import { useSelector } from 'react-redux'
import { IoMdClose } from "react-icons/io"

const Profile = ({ handelProfiledDontSHow }) => {
  const { user } = useSelector((state) => state.auth)

  const initial = user?.email?.[0]?.toUpperCase() || '?'

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-full max-w-xl px-4 text-red-500">
        <div className="rounded-3xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.50)] relative border border-slate-100 p-6 sm:p-8">

          <div
            className="absolute right-0 top-0 bg-black p-2.5 rounded-tr-2xl rounded-bl-2xl font-extrabold hidden max-sm:block"
            onClick={handelProfiledDontSHow}
          >
            <IoMdClose />
          </div>

          <div className="flex items-center gap-4 sm:gap-6 mb-6">
            <div className="flex p-2 h-20 w-20 items-center justify-center rounded-2xl bg-slate-50 text-3xl font-extrabold text-slate-700 shadow-inner">
              {initial}
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-xl sm:text-sm font-semibold text-slate-900 tracking-tight capitalize">
                {user?.name || user?.email || '-'}
              </h2>
              <p className="text-sm text-slate-500">
                {user?.positionApplyingFor || 'Candidate'}
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Email
              </span>
              <span className="text-slate-800 break-all">
                {user?.email || '-'}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Mobile
              </span>
              <span className="text-slate-800">
                {user?.mobile || '-'}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Position applying for
              </span>
              <span className="text-slate-800 capitalize">
                {user?.positionApplyingFor || '-'}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Skills
              </span>

              <div className="flex flex-wrap gap-2">
                {user?.skills?.length > 0 ? (
                  user.skills.map((val, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {val}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 text-sm">
                    No skills added
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                College
              </span>
              <span className="text-slate-800 capitalize">
                {user?.college || '-'}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile
