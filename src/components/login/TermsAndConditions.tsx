// External libraries
import React from 'react';
import { AiOutlineClose } from "react-icons/ai";

// CSS
import '../../styles/main.css';

// Components
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button'
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Body, { BodyType, BodyColor } from '../ui/typography/Body';
import Modal from '../ui/modal/Modal';


interface TermsAndConditionsProps {
	showModal: boolean;
	handleModal: (value: any) => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
	showModal,
	handleModal
}) => {
	return (
		<div>
			<Modal showModal={showModal} classname='width-62-5'>
				<div className=' modal-header d-flex flex-row justify-content-between align-items-center w-100 border-0 padding-bottom-0'>
					<div className="d-flex flex-row align-items-center">
						<Heading
							title='Terms and Conditions'
							type={TypographyType.h2}
							colour={TypographyColor.dark}
							classname='text-start'
						/>
						<Body
							type={BodyType.p2}
							color={BodyColor.dark}
							classname='text-start margin-left-right-2 margin-bottom-0'
						>
							Last updated: DD/MM/YYYY
						</Body>
					</div>
					<Button
						theme={ButtonTheme.primary}
						variant={ButtonVariant.transparent}
						onClick={() => handleModal({ tncModal: false })}
						type='button'
						classname='padding-left-right-0'
					>
						<AiOutlineClose className="fs-20" />
					</Button>
				</div>
				<div className="modal-body d-flex flex-column justify-content-center align-items-center m-auto p-6 padding-top-0 modal-padding">
					<div className=" d-flex flex-column justify-content-start modal-dialog-scrollable margin-top-bottom-2">
						<Body
							type={BodyType.p2}
							color={BodyColor.secondary}
							classname='text-start'
						>
							Please read these Terms and Conditions (“Terms”) carefully before using our services. By accessing or using our services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not use our services.
						</Body>
						<Heading
							title='1. General'
							type={TypographyType.h3}
							colour={TypographyColor.dark}
							classname='text-start margin-top-1-25 margin-bottom-0-63'
						/>
						<Body
							type={BodyType.p2}
							color={BodyColor.secondary}
							classname='text-start'
						>
							1.1 These Terms apply to all users of our services, including but not limited to website visitors, customers, and clients. <br />
							1.2 Our services may include, but are not limited to, the provision of information, products, and online resources. <br />
							1.3 We reserve the right to modify, update, or discontinue our services at any time without prior notice.
						</Body>
						<Heading
							title='2. Intellectual Property'
							type={TypographyType.h3}
							colour={TypographyColor.dark}
							classname='text-start margin-top-4 margin-bottom-0-63'
						/>
						<Body
							type={BodyType.p2}
							color={BodyColor.secondary}
							classname='text-start'
						>
							2.1 All content and materials provided through our services, including but not limited to text, graphics, logos, images, videos, and software, are the property of our company and are protected by applicable intellectual property laws. <br />
							2.2 You may not reproduce, distribute, modify, display, or use any of our intellectual property without our prior written consent. <br />
						</Body>
						<Heading
							title='3. User Responsibilities'
							type={TypographyType.h3}
							colour={TypographyColor.dark}
							classname='text-start margin-top-4 margin-bottom-0-63'
						/>
						<Body
							type={BodyType.p2}
							color={BodyColor.secondary}
							classname='text-start'
						>
							3.1 By using our services, you agree to provide accurate and current information and to ensure the security of your account credentials.
						</Body>
					</div>
					<Button
						theme={ButtonTheme.primary}
						size={ButtonSize.medium}
						variant={ButtonVariant.bordered}
						onClick={() => handleModal({ tncModal: false })}
						classname='height-3'
					>
						Agree
					</Button>
				</div>
			</Modal>
		</div>
	)
}

export default TermsAndConditions;