import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import service from "../services/service";

/* ===================== REGISTER USER ===================== */
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, thunkAPI) => {
    try {
      const res = await service.registerUser(payload);
      toast.success("Registration successful");
      return res.data;
    } catch (error) {
      const msg =
        error.response?.data?.message || "Registration failed";
      toast.error(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

/* ===================== REGISTER ADMIN ===================== */
export const registerAdmin = createAsyncThunk(
  "auth/registerAdmin",
  async (payload, thunkAPI) => {
    try {
      const res = await service.registerAdmin(payload);
      toast.success("Admin registered successfully");
      return res.data;
    } catch (error) {
      const msg =
        error.response?.data?.message || "Admin registration failed";
      toast.error(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

/* ===================== LOGIN USER ===================== */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, thunkAPI) => {
    try {
      const res = await service.loginUser(payload);
      toast.success("Login successful");
      return res.data;
    } catch (error) {
      const msg =
        error.response?.data?.message || "Login failed";
      toast.error(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

/* ===================== LOGIN ADMIN ===================== */
export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (payload, thunkAPI) => {
    try {
      const res = await service.loginAdmin(payload);
      toast.success("Admin login successful");
      return res.data;
    } catch (error) {
      const msg =
        error.response?.data?.message || "Admin login failed";
      toast.error(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

/* ===================== VERIFY OTP ===================== */
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await service.verifyUser(payload);
      toast.success("OTP verified successfully");
      return res.data;
    } catch (error) {
      const msg =
        error.response?.data?.message || "OTP verification failed";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

/* ===================== GET ALL COMPANIES ===================== */
export const allCompanies = createAsyncThunk(
  "allcompanies",
  async (_, { rejectWithValue }) => {
    try {
      const res = await service.getCompanies();
      return res.data;
    } catch (error) {
      const msg =
        error.response?.data?.message || "Failed to load companies";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

/* ===================== APPLY COMPANY ===================== */
export const applyCompanies = createAsyncThunk(
  "companies/apply",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const res = await service.applyCompanies(payload, token);
      toast.success("Applied successfully");
      return res.data;
    } catch (error) {
      const msg =
        error.response?.data?.message || "Company apply failed";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);


/* ===================== add COMPANY ===================== */
export const createCompanies = createAsyncThunk(
  "companies/create",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const res = await service.createCompanies(payload, token);
      toast.success("Applied successfully");
      return res.data;
    } catch (error) {
      const msg =
        error.response?.data?.message || "Company apply failed";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);


/* ===================== INITIAL STATE ===================== */
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  companies: [],
  applySuccess: false,
};

/* ===================== SLICE ===================== */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },

  extraReducers: (builder) => {
    builder
      /* REGISTER USER */
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* REGISTER ADMIN */
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* LOGIN USER */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* LOGIN ADMIN */
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* VERIFY OTP */
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ALL COMPANIES */
      .addCase(allCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload.companies;
      })
      .addCase(allCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* APPLY COMPANY */
      .addCase(applyCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.applySuccess = false;
      })
        .addCase(applyCompanies.fulfilled, (state, action) => {
          state.loading = false;
          state.applySuccess = true;

          const appliedCompanyId = action.payload.companyId; // get from API response
          if (!state.user.appliedCompanies.some(c => c._id === appliedCompanyId)) {
            state.user.appliedCompanies.push({ _id: appliedCompanyId });
          }
        })
      .addCase(applyCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })      /* ADD COMPANY */
      .addCase(createCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.applySuccess = false;
      })
        .addCase(createCompanies.fulfilled, (state, action) => {
          state.loading = false;
          state.applySuccess = true;
        })
      .addCase(createCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ===================== EXPORTS ===================== */
export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
