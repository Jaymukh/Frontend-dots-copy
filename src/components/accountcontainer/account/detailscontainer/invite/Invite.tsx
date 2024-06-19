/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import React, { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from "recoil";
import { MdPersonAddAlt1, MdModeEdit, MdDeleteSweep } from 'react-icons/md';

// CSS
import '../../../../../styles/main.css';

// Components
import { useUserService } from '../../../../../services';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
import InviteSent from './InviteSent'; import Search from '../../../../ui/search/Search';
import Body, { BodyColor, BodyType } from '../../../../ui/typography/Body';
import EditInvite from './EditInvite';
import InviteNew from './InviteNew';
import ConfirmDelete from './ConfirmDelete';
import { usersState, User, spinnerState, errorState } from "../../../../../states";
import { useMapHelpers } from '../../../../../helpers';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';
import * as Constants from '../../../../../utils/constants/Constants'

interface NewData {
	name: string | undefined;
	email_id: string | undefined;
	role: string | undefined;
	company: string | undefined;
	company_type: string | undefined;
}

export default function Invite() {
	const [selectedData, setSelectedData] = useState<User | null>(null);
	const [openInviteNew, setOpenInviteNew] = useState(false);
	const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState<string>('');
	const [newData, setNewData] = useState<NewData>({
		name: undefined,
		email_id: undefined,
		company: undefined,
		role: undefined,
		company_type: undefined,
	});

	// all user's data
	const userService = useUserService();
	const [users, setUsers] = useRecoilState(usersState);
	const [openInviteSent, setOpenInviteSent] = useState(false);
	const [spinner, setSpinner] = useRecoilState(spinnerState);
	const setError = useSetRecoilState(errorState);
	const { getErrorMsg } = useMapHelpers();
	const [buttonState, setButtonState] = useState<[number, boolean]>([2, false]);

	const handleChangeData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		e.preventDefault();
		var name = e.target.name;
		var value = e.target.value;
		setNewData({ ...newData, [name]: value });
	}
	//function to get all the users
	useEffect(() => {
		setSpinner(true);
		userService.getAll();
	}, []);

	const handleEditClick = (row: User) => {
		setSelectedData(row);
	};
	const handleCloseDialog = () => {
		setSelectedData(null);
	};
	const handleUpdate = (updatedRow: User) => {
		setSpinner(true);
		userService.editInvite(updatedRow)
			.then((response: any) => {
				if (response) {
					setSpinner(false);
					userService.getAll();
					handleCloseDialog();
					setError({ type: 'Success', message: 'Successfully updated.' });
				}
			})
			.catch(error => {
				setSpinner(false);
				getErrorMsg(error);
			});
	};


	// invite new drawer
	const handleOpenInviteNew = () => {
		setOpenInviteNew(true);
	};
	const handleCloseInviteNew = () => {
		setOpenInviteNew(false);
	};
	const handleInviteSentModal = () => {
		setOpenInviteSent(false);
		setNewData({
			name: undefined,
			email_id: undefined,
			company: undefined,
			role: undefined,
			company_type: undefined,
		});
	}

	// searchbar function
	const [searchTerm, setSearchTerm] = useState('');
	var [suggestions, setSuggestions] = useState<User[]>([]);

	const handleInputChange = (value: string) => {
		setSearchTerm(value);
	};

	useEffect(() => {
		if (!searchTerm) {
			setSuggestions([]);
		} else {
			const lowercasedValue = searchTerm.toLowerCase();
			const result = users?.filter((item: any) => {
				const lowercasedName = item?.name?.toLowerCase();
				const lowercasedEmail = item?.email_id?.toLowerCase();
				const lowercasedRole = item?.role?.toLowerCase();
				const lowercasedCompany = item?.company?.toLowerCase();
				const lowercasedCompanyType = item?.company_type?.toLowerCase();
				const lowercasedLastLogin = item?.last_login?.toLowerCase();

				return (
					lowercasedName.includes(lowercasedValue) ||
					lowercasedEmail.includes(lowercasedValue) ||
					lowercasedRole.includes(lowercasedValue) ||
					lowercasedCompany.includes(lowercasedValue) ||
					lowercasedCompanyType.includes(lowercasedValue) ||
					lowercasedLastLogin.includes(lowercasedValue)
				);
			});

			setSuggestions(result || []);
		}
	}, [searchTerm]);

	// Confirm Delete Model
	const openConfirmDeleteModal = (showConfirmDeleteModal: boolean, user_id: string) => {
		setShowConfirmDeleteModal(showConfirmDeleteModal);
		setSelectedUserId(user_id);
	};

	const closeConfirmDeleteModal = () => {
		setShowConfirmDeleteModal(false);
	};

	// function for Delete
	const handleDeleteClick = () => {
		setSpinner(true);
		userService.deleteInvite(selectedUserId!)
			.then((response) => {
				if (response) {
					userService.getAll();
					setSpinner(false);
					setShowConfirmDeleteModal(false);
				}
			})
			.catch(error => {
				setSpinner(false);
				getErrorMsg(error);
			});
	};

	// function for sorting
	const handleSortTable = (item: Constants.InviteTableHeader, order: string, index: number) => {
		setButtonState([index, order === 'asc' ? true : false]);
		let sortedTable = users.slice().sort((a: any, b: any) => {
			const actualKey = item.key + 'ActualValue';
			const hasActualValue = users.some((obj: any) => obj.hasOwnProperty(actualKey));
			if (a[item.key] === null && b[item.key] === null) {
				return 0;
			} else if (a[item.key] === null) {
				return 1;
			} else if (b[item.key] === null) {
				return -1;
			} else if (typeof a[item.key] === 'string' && typeof b[item.key] === 'string') {
				if (hasActualValue) {
					return order === 'desc' ? a[actualKey] - b[actualKey] : b[actualKey] - a[actualKey];
				}
				return order === 'desc' ? a[item.key].localeCompare(b[item.key]) : b[item.key].localeCompare(a[item.key]);
			} else if (typeof a[item.key] === 'number' && typeof b[item.key] === 'number') {
				if (hasActualValue) {
					return order === 'desc' ? a[actualKey] - b[actualKey] : b[actualKey] - a[actualKey];
				}
				return order === 'desc' ? b[item.key] - a[item.key] : a[item.key] - b[item.key];
			} else {
				return 0;
			}
		});
		setUsers([...sortedTable])
	}

	return (
		<div className='container bg-white margin-top-4 margin-right-5 padding-left-right-0 details-account' >
			<div className="row margin-left-right-0 w-100 h-10 d-flex flex-row justify-content-between align-items-center padding-top-3 padding-right-4">
				<Heading
					title='Invite'
					type={TypographyType.h2}
					colour={TypographyColor.dark}
					classname='col-2 margin-left-3 text-start padding-left-2'
				/>
				<div className='col-8 d-flex flex-row justify-content-end align-items-center padding-left-right-0'>
					<Search
						handleInputChange={handleInputChange}
						searchTerm={searchTerm}
						suggestions={suggestions}
						hideSuggestionBox={true}
						placeholderValue='Search'
						classname='height-5 table-search'
					/>
					<Button
						theme={ButtonTheme.secondary}
						size={ButtonSize.default}
						variant={ButtonVariant.bordered}
						onClick={() => handleOpenInviteNew()}
						classname='margin-left-2'
					>
						<MdPersonAddAlt1 className='margin-right-1 fs-22' />
						Invite New
					</Button>
				</div>
			</div>
			<hr className='margin-bottom-4' />
			<div className="w-auto margin-left-right-4 d-flex table-height justify-content-center m-auto overflow-hidden">
				{!spinner &&
					<div className='invite-table-container'>
						<table className=''>
							<thead>
								<tr>
									{Constants.inviteTableHeader.map((item, index) => (
										<th className='text-start'>
											<div className='d-flex flex-row align-items-center'>
												<p className='padding-top-3 padding-right-2'>{item.value}</p>
												<div className='d-flex flex-column'>
													<BiSolidUpArrow name='desc' className="fs-9" color={`${(buttonState[0] === index) && !buttonState[1] ? '#2B0D5C' : '#939393'}`} onClick={() => handleSortTable(item, 'desc', index)} />
													<BiSolidDownArrow name='asc' className="fs-9" color={`${(buttonState[0] === index) && buttonState[1] ? '#2B0D5C' : '#939393'}`} onClick={() => handleSortTable(item, 'asc', index)} />
												</div>
											</div>
										</th>
									))}
									<th className='text-center'>Action</th>
								</tr>
							</thead>
							<tbody>
								{(searchTerm && (suggestions?.length > 0))
									? (suggestions.map((row) => (
										<tr
											key={row.email_id}
										>
											<td className='text-start fs-14'>{row.name}<br />
												<Body
													color={BodyColor.muted}
													type={BodyType.p3}
												>
													{row.email_id}
												</Body>
											</td>
											<td className='text-start fs-14'><div className='color-purple text-start'>{row.role}</div></td>
											<td className='text-start fs-14'>{row.last_login}</td>
											<td className='text-start fs-14'>{row.company}</td>
											<td className='text-start fs-14'>{row.company_type}</td>
											<td className='text-center' style={{ whiteSpace: 'nowrap' }}>
												<Button
													theme={ButtonTheme.muted}
													size={ButtonSize.default}
													variant={ButtonVariant.transparent}
													onClick={() => handleEditClick(row)}
												>
													<MdModeEdit className="fs-20" />
												</Button>
												<Button
													theme={ButtonTheme.warning}
													size={ButtonSize.default}
													variant={ButtonVariant.transparent}
													onClick={() => openConfirmDeleteModal(true, row.user_id)}
												>
													<MdDeleteSweep className="fs-20" />
												</Button>
											</td>
										</tr>))
									)
									: ((searchTerm && (suggestions.length === 0))
										? (<tr>
											<td colSpan={12} className='text-center fs-14'>
												No matches found!
											</td>
										</tr>)
										: (
											users?.map((row) => (
												<tr
													key={row.email_id}
												>
													<td className='text-start fs-14'>{row.name}<br />
														<Body
															color={BodyColor.muted}
															type={BodyType.p3}
														>
															{row.email_id}
														</Body>
													</td>
													<td className='text-start fs-14'><div className='color-purple text-start'>{row.role}</div></td>
													<td className='text-start fs-14'>{row.last_login}</td>
													<td className='text-start fs-14 color-black'>{row.company}</td>
													<td className='text-start fs-14 color-black'>{row.company_type}</td>
													<td className='text-center' style={{ whiteSpace: 'nowrap' }}>
														<Button
															theme={ButtonTheme.muted}
															size={ButtonSize.default}
															variant={ButtonVariant.transparent}
															onClick={() => handleEditClick(row)}
														>
															<MdModeEdit className="fs-20" />
														</Button>
														<Button
															theme={ButtonTheme.warning}
															size={ButtonSize.default}
															variant={ButtonVariant.transparent}
															onClick={() => openConfirmDeleteModal(true, row.user_id)}
														>
															<MdDeleteSweep className="fs-20" />
														</Button>
													</td>
												</tr>
											))
										)
									)
								}

							</tbody>
						</table>
					</div>
				}
			</div>

			{selectedData &&
				<EditInvite selectedData={selectedData} handleCloseDialog={handleCloseDialog} handleUpdate={handleUpdate} />}

			{openInviteNew &&
				<InviteNew openInviteNew={openInviteNew} newData={newData} setNewData={setNewData} handleChangeData={handleChangeData} handleCloseInviteNew={handleCloseInviteNew} setOpenInviteSent={setOpenInviteSent} />}

			{openInviteSent &&
				<InviteSent openInviteSent={openInviteSent} handleInviteSentModal={handleInviteSentModal} email={newData.email_id} />}

			{showConfirmDeleteModal &&
				<ConfirmDelete showConfirmDeleteModal={showConfirmDeleteModal}
					closeConfirmDeleteModal={closeConfirmDeleteModal} handleDeleteClick={handleDeleteClick} />}
		</div>
	)
}

