'use client';

import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from 'react';

type SignUpContextType = {
	inputEmail: string;
	setInputEmail: Dispatch<SetStateAction<string>>;
	inputPassword: string;
	setInputPassword: Dispatch<SetStateAction<string>>;
};

const SignUpContext = createContext({} as SignUpContextType);

type Props = {
	children: ReactNode;
};

export const SignUpProvider = ({ children }: Props) => {
	const [inputEmail, setInputEmail] = useState('');
	const [inputPassword, setInputPassword] = useState('');

	return (
		<SignUpContext.Provider
			value={{ inputEmail, setInputEmail, inputPassword, setInputPassword }}
		>
			{children}
		</SignUpContext.Provider>
	);
};

export const useSignUpContext = () => useContext(SignUpContext);
