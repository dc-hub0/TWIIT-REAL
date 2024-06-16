// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { MdOutlineMail, MdPassword } from "react-icons/md";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";

// const LoginPage = () => {
// 	const [formData, setFormData] = useState({
// 		username: "",
// 		password: "",
// 	});
// 	const queryClient = useQueryClient();

// 	const { mutate: loginMutation, isError, isLoading, error } = useMutation({
// 		mutationFn: async ({ username, password }) => {
// 			try {
// 				const res = await fetch("/api/auth/login", {
// 					method: "POST",
// 					headers: {
// 						"Content-Type": "application/json",
// 					},
// 					body: JSON.stringify({ username, password }),
// 				});

// 				const data = await res.json();
// 				if (!res.ok) throw new Error(data.error || "Something went wrong");
// 				return data;
// 			} catch (error) {
// 				throw error;
// 			}
// 		},
// 		onSuccess: () => {
// 			toast.success("Logged in successfully");
// 			queryClient.invalidateQueries({ queryKey: ["authUser"] });
// 		},
// 	});

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		loginMutation(formData);
// 	};

// 	const handleInputChange = (e) => {
// 		setFormData({ ...formData, [e.target.name]: e.target.value });
// 	};

// 	return (
// 		<div
// 			className="flex items-center justify-center min-h-screen w-screen"
// 			style={{
// 				backgroundImage: "url('/src/pages/auth/login/img2.jpg')",
// 				backgroundSize: 'cover',
// 				backgroundPosition: 'center',
// 				backgroundRepeat: 'no-repeat',
// 			}}
// 		>
// 			<div
// 				className="flex flex-col items-center bg-opacity-60 p-8 rounded-lg shadow-md backdrop-filter backdrop-blur-lg"
// 				style={{ backgroundColor: 'rgba(142 119 119 / 60%)' }} // Adjusted background color
// 			>
// 				<h1 className="text-4xl font-extrabold text-white mb-6">{"Let's go."}</h1>
// 				<form className="w-full max-w-md flex flex-col gap-4" onSubmit={handleSubmit}>
// 					<label className="flex items-center gap-2">
// 						<MdOutlineMail className="text-white" />
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
// 						{isLoading ? "Loading..." : "Login"}
// 					</button>
// 					{isError && <p className="text-red-500 mt-2">{error.message}</p>}
// 				</form>
// 				<p className="text-white mt-6">{"Don't have an account?"}</p>
// 				<Link to="/signup">
// 					<button className="mt-2 bg-transparent border border-white text-white font-bold py-2 px-4 rounded-full hover:bg-white hover:text-indigo-500">
// 						Sign up
// 					</button>
// 				</Link>
// 			</div>
// 		</div>
// 	);
// };

// export default LoginPage;


import { useState } from "react";
import { Link } from "react-router-dom";

import XSvg from "../../../components/svgs/X";
import YSvg from "../../../components/svgs/Y";
import ZSvg from "../../../components/svgs/Z";

import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const LoginPage = () => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const queryClient = useQueryClient();

	const {
		mutate: loginMutation,
		isPending,
		isError,
		error,
	} = useMutation({
		mutationFn: async ({ username, password }) => {
			try {
				const res = await fetch("/api/auth/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ username, password }),
				});

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			// refetch the authUser
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		loginMutation(formData);
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className='max-w-screen-xl mx-auto flex h-screen'>
			<div className='flex-1 hidden lg:flex items-center  justify-center'>
				<ZSvg className='lg:w-2/3 fill-white' />
			</div>
			<div className='flex-1 flex flex-col justify-center items-center'>
				<form className='flex gap-4 flex-col' onSubmit={handleSubmit}>
					<ZSvg className='w-24 lg:hidden fill-white' />
					<h1 className='text-4xl font-extrabold text-white'>{"Let's"} go.</h1>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdOutlineMail />
						<input
							type='text'
							className='grow'
							placeholder='username'
							name='username'
							onChange={handleInputChange}
							value={formData.username}
						/>
					</label>

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
						{isPending ? "Loading..." : "Login"}
					</button>
					{isError && <p className='text-red-500'>{error.message}</p>}
				</form>
				<div className='flex flex-col gap-2 mt-4'>
					<p className='text-white text-lg'>{"Don't"} have an account?</p>
					<Link to='/signup'>
						<button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign up</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;