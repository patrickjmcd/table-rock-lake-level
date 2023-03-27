import { Fragment } from 'react';
import { Disclosure, Menu, Switch, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import {
	Bars3Icon,
	XMarkIcon,
	LifebuoyIcon
} from '@heroicons/react/24/outline';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

interface NavbarProps {
	darkModeEnabled: boolean;
	onDarkModeChange: (e: unknown) => void;
}

type NavItem = {
	name: string;
	key: string;
	href: string;
	hasChildren?: boolean;
	current?: boolean;
	parent?: string;
}

export default function Navbar(props: NavbarProps) {
	const { darkModeEnabled, onDarkModeChange } = props;
	const router = useRouter();
	const childNav: NavItem[] = [
		// {
		// 	name: 'Current',
		// 	key: 'lakeLevel',
		// 	parent: 'lakeLevelParent',
		// 	href: '/',
		// 	current: router.pathname === '/',
		// },
		// {
		// 	name: 'Historical',
		// 	key: 'lakeLevel',
		// 	parent: 'lakeLevelParent',
		// 	href: '/',
		// 	current: router.pathname === '/',
		// },
	];

	const parentNav: NavItem[] = [
		{
			name: 'Lake Level',
			key: 'lakeLevelParent',
			hasChildren: false,
			href: '/',
			current:
				router.pathname === '/',
		},
		{
			name: 'About',
			key: 'aboutParent',
			hasChildren: false,
			href: '/about',
			current: router.pathname.includes('about'),
		},
	];

	const mobileNavItems = () => {
		const parents = parentNav.filter((parent) => {
			return !parent.hasChildren;
		})
		return [...parents, ...childNav]

	}

	return (
		<Disclosure as="nav" className="bg-white dark:bg-gray-900">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-full px-6 sm:px-6">
						<div className="relative flex h-16 items-center justify-between sm:justify-start">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button */}
								<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex flex-1 items-left sm:items-stretch sm:justify-start ml-12 sm:ml-0">
								<div className="flex flex-shrink-0 items-center">
									<div className="w-6 m-auto cursor-pointer mx-1">
										<LifebuoyIcon className="block h-6 w-6 text-blue-900 dark:text-blue-200" aria-hidden="true" />
									</div>
									<div className="flex px-4 py-2 font-semibold text-green-50 dark:text-white">
										<Link href="/">
											<div className="hidden sm:flex dark:hover:text-green-50 text-md cursor-pointer py-2 my-4">
												Table Rock Lake Level
											</div>
										</Link>
									</div>
								</div>
								<div className="hidden md:ml-6 md:block py-8">
									<div className="flex space-x-4">
										{parentNav.map((parentNavItem) => (
											<div className="flex inset-y-0" key={parentNavItem.key}>
												{parentNavItem.hasChildren ? (
													<Menu>
														<Menu.Button
															className={classNames(
																parentNavItem.current
																	? 'dark:bg-blue-900 dark:text-white border-b-2 py-5 border-green-50 dark:border-none'
																	: 'text-gray-900 dark:text-white dark:bg-gray-900 hover:bg-gray-200/50  rounded-md',
																'px-3 py-5 dark:rounded-md dark:py-2 text-sm font-medium transition ease-in-out duration-300 whitespace-nowrap',
															)}
														>
															{parentNavItem.name}
														</Menu.Button>
														<Transition
															as={Fragment}
															enter="transition ease-out duration-100"
															enterFrom="transform opacity-0 scale-95"
															enterTo="transform opacity-100 scale-100"
															leave="transition ease-in duration-75"
															leaveFrom="transform opacity-100 scale-100"
															leaveTo="transform opacity-0 scale-95"
														>
															<Menu.Items className="absolute mt-16 py-1 dark:mt-10 w-48 shadow-lg dark:bg-gray-700 bg-white rounded-md z-50">
																{childNav
																	.filter(
																		(ci) => ci.parent === parentNavItem.key,
																	)
																	.map((childNavItem) => (
																		<Menu.Item
																			key={`${childNavItem.key}-menuitem`}
																		>
																			{({ active }) => (
																				<a
																					key={`${childNavItem.key}-menulink`}
																					onClick={() =>
																						router.push(childNavItem.href)
																					}
																					className={classNames(
																						active
																							? 'bg-gray-100 dark:bg-gray-500'
																							: '',
																						'block px-4 py-2 text-sm text-gray-700 dark:text-slate-300 cursor-pointer',
																					)}
																				>
																					{childNavItem.name}
																				</a>
																			)}
																		</Menu.Item>
																	))}
															</Menu.Items>
														</Transition>
													</Menu>
												) : (<Menu><Menu.Button
													className={classNames(
														parentNavItem.current
															? 'dark:bg-blue-900 dark:text-white border-b-2 py-5 border-green-50 dark:border-none'
															: 'text-gray-900 dark:text-white dark:bg-gray-900 hover:bg-gray-200/50  rounded-md',
														'px-3 py-5 dark:rounded-md dark:py-2 text-sm font-medium transition ease-in-out duration-300 whitespace-nowrap',
													)}
													as="a"
													href={parentNavItem.href}
												>
													{parentNavItem.name}
												</Menu.Button></Menu>)}
											</div>
										))}
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								{/* Profile dropdown */}
								<Menu as="div" className="relative ml-3">
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											<Menu.Item as="div">
												<Switch.Group>
													<div className="flex items-center px-4 py-2 border-b-2">
														<Switch.Label className="mr-3 uppercase text-xs font-semibold text-gray-900 dark:text-white">
															Dark Mode
														</Switch.Label>
														<Switch
															name="darkMode"
															checked={darkModeEnabled}
															onChange={onDarkModeChange}
															className={`${
																darkModeEnabled
																	? 'bg-blue-600'
																	: 'bg-gray-200 dark:bg-slate-800'
															} relative inline-flex h-6 w-11 items-center rounded-full`}
														>
															<span
																className={`${
																	darkModeEnabled
																		? 'translate-x-6'
																		: 'translate-x-1'
																} inline-block h-4 w-4 transform rounded-full bg-white dark:bg-slate-800 shadow-md transition`}
															>
																<MoonIcon className="text-yellow-400 rounded-full hidden dark:block" />
																<SunIcon className="rounded-full text-yellow-400 dark:hidden" />
															</span>
														</Switch>
													</div>
												</Switch.Group>
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<a
														href="#"
														className={classNames(
															active ? 'bg-gray-100 dark:bg-gray-500' : '',
															'block px-4 py-2 text-sm text-gray-700 dark:text-slate-300',
														)}
													>
														Your Profile
													</a>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<a
														href="#"
														className={classNames(
															active ? 'bg-gray-100 dark:bg-gray-500' : '',
															'block px-4 py-2 text-sm text-gray-700 dark:text-slate-300',
														)}
													>
														Settings
													</a>
												)}
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="space-y-1 px-2 pt-2 pb-3">
							{mobileNavItems().map((item) => (
								<Disclosure.Button
									key={`${item.key}-mobile-menu`}
									as="a"
									href={item.href}
									className={classNames(
										item.current
											? 'bg-gray-900 text-white'
											: 'text-gray-700 dark:text-gray-300 hover:bg-gray-700 hover:text-white',
										'block px-3 py-2 rounded-md text-base font-medium',
									)}
									aria-current={item.current ? 'page' : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}

Navbar.getInitialProps = () => ({});
