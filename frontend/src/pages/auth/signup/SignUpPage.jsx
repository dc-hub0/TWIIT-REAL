// import { Link } from "react-router-dom";
// import { useState } from "react";

// import { MdOutlineMail, MdPassword, MdDriveFileRenameOutline } from "react-icons/md";
// import { FaUser } from "react-icons/fa";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";

// const SignUpPage = () => {
// 	const [formData, setFormData] = useState({
// 		email: "",
// 		username: "",
// 		fullName: "",
// 		password: "",
// 	});

// 	const queryClient = useQueryClient();

// 	const { mutate, isError, isLoading, error } = useMutation({
// 		mutationFn: async ({ email, username, fullName, password }) => {
// 			try {
// 				const res = await fetch("/api/auth/signup", {
// 					method: "POST",
// 					headers: {
// 						"Content-Type": "application/json",
// 					},
// 					body: JSON.stringify({ email, username, fullName, password }),
// 				});

// 				const data = await res.json();
// 				if (!res.ok) throw new Error(data.error || "Failed to create account");
// 				console.log(data);
// 				return data;
// 			} catch (error) {
// 				console.error(error);
// 				throw error;
// 			}
// 		},
// 		onSuccess: () => {
// 			toast.success("Account created successfully");
// 			queryClient.invalidateQueries({ queryKey: ["authUser"] });
// 		},
// 	});

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		mutate(formData);
// 	};

// 	const handleInputChange = (e) => {
// 		setFormData({ ...formData, [e.target.name]: e.target.value });
// 	};

// 	return (
// 		<div
// 			className="flex items-center justify-center min-h-screen w-screen"
// 			style={{
// 				backgroundImage: "url('/src/pages/auth/signup/img1.jpg')",
// 				backgroundSize: 'cover',
// 				backgroundPosition: 'center',
// 				backgroundRepeat: 'no-repeat',
// 			}}
// 		>
// 			<div className="flex flex-col items-center bg-opacity-60 p-8 rounded-lg shadow-md backdrop-filter backdrop-blur-lg">
// 				<h1 className="text-4xl font-extrabold text-white mb-6">Join today.</h1>
// 				<form className="w-full max-w-md flex flex-col gap-4" onSubmit={handleSubmit}>
// 					<label className="flex items-center gap-2">
// 						<MdOutlineMail className="text-white" />
// 						<input
// 							type="email"
// 							className="bg-transparent border-b-2 border-white focus:outline-none focus:border-indigo-300 placeholder-white text-white w-full"
// 							placeholder="Email"
// 							name="email"
// 							onChange={handleInputChange}
// 							value={formData.email}
// 						/>
// 					</label>
// 					<label className="flex items-center gap-2">
// 						<FaUser className="text-white" />
// 						<input
// 							type="text"
// 							className="bg-transparent border-b-2 border-white focus:outline-none focus:border-indigo-300 placeholder-white text-white w-full"
// 							placeholder="Username"
// 							name="username"
// 							onChange={handleInputChange}
// 							value={formData.username}
// 						/>
// 					</label>
// 					<label className="flex items-center gap-2">
// 						<MdDriveFileRenameOutline className="text-white" />
// 						<input
// 							type="text"
// 							className="bg-transparent border-b-2 border-white focus:outline-none focus:border-indigo-300 placeholder-white text-white w-full"
// 							placeholder="Full Name"
// 							name="fullName"
// 							onChange={handleInputChange}
// 							value={formData.fullName}
// 						/>
// 					</label>
// 					<label className="flex items-center gap-2">
// 						<MdPassword className="text-white" />
// 						<input
// 							type="password"
// 							className="bg-transparent border-b-2 border-white focus:outline-none focus:border-indigo-300 placeholder-white text-white w-full"
// 							placeholder="Password"
// 							name="password"
// 							onChange={handleInputChange}
// 							value={formData.password}
// 						/>
// 					</label>
// 					<button className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full">
// 						{isLoading ? "Loading..." : "Sign up"}
// 					</button>
// 					{isError && <p className="text-red-500 mt-2">{error.message}</p>}
// 				</form>
// 				<p className="text-white mt-6">Already have an account?</p>
// 				<Link to="/login">
// 					<button className="mt-2 bg-transparent border border-white text-white font-bold py-2 px-4 rounded-full hover:bg-white hover:text-indigo-500">
// 						Sign in
// 					</button>
// 				</Link>
// 			</div>
// 		</div>
// 	);
// };

// export default SignUpPage;



import { Link } from "react-router-dom";
import { useState } from "react";

import XSvg from "../../../components/svgs/X";
import ZSvg from "../../../components/svgs/Z";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import YSvg from "../../../components/svgs/Y";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		email: "",
		username: "",
		fullName: "",
		password: "",
	});

	const queryClient = useQueryClient();

	const { mutate, isError, isPending, error } = useMutation({
		mutationFn: async ({ email, username, fullName, password }) => {
			try {
				const res = await fetch("/api/auth/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, username, fullName, password }),
				});

				const data = await res.json();
				if (!res.ok) throw new Error(data.error || "Failed to create account");
				console.log(data);
				return data;
			} catch (error) {
				console.error(error);
				throw error;
			}
		},
		onSuccess: () => {
			toast.success("Account created successfully");

			{
				/* Added this line below, after recording the video. I forgot to add this while recording, sorry, thx. */
			}
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault(); // page won't reload
		mutate(formData);
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className='max-w-screen-xl mx-auto flex h-screen px-10'>
			<div className='flex-1 hidden lg:flex items-center  justify-center'>
				<ZSvg className='lg:w-2/3 fill-white' />
			</div>
			<div className='flex-1 flex flex-col justify-center items-center'>
				<form className='lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col' onSubmit={handleSubmit}>
					<ZSvg className='w-24 lg:hidden fill-white' />
					<h1 className='text-4xl font-extrabold text-white'>Join today.</h1>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdOutlineMail />
						<input
							type='email'
							className='grow'
							placeholder='Email'
							name='email'
							onChange={handleInputChange}
							value={formData.email}
						/>
					</label>
					<div className='flex gap-4 flex-wrap'>
						<label className='input input-bordered rounded flex items-center gap-2 flex-1'>
							<FaUser />
							<input
								type='text'
								className='grow '
								placeholder='Username'
								name='username'
								onChange={handleInputChange}
								value={formData.username}
							/>
						</label>
						<label className='input input-bordered rounded flex items-center gap-2 flex-1'>
							<MdDriveFileRenameOutline />
							<input
								type='text'
								className='grow'
								placeholder='Full Name'
								name='fullName'
								onChange={handleInputChange}
								value={formData.fullName}
							/>
						</label>
					</div>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdPassword />
						<input
							type='password'
							className='grow'
							placeholder='Password'
							name='password'
							onChange={handleInputChange}
							value={formData.password}
						/>
					</label>
					<button className='btn rounded-full btn-primary text-white'>
						{isPending ? "Loading..." : "Sign up"}
					</button>
					{isError && <p className='text-red-500'>{error.message}</p>}
				</form>
				<div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
					<p className='text-white text-lg'>Already have an account?</p>
					<Link to='/login'>
						<button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign in</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default SignUpPage;