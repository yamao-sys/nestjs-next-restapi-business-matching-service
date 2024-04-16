'use client';

import { FetchExperiencedEntityMasterResponse } from '@/api/experienced_entity_masters/@types';
import {
	ProfileForEditDto,
	UpdateProfileDto,
	UpdateProfileResponseDto,
} from '@/api/profiles/@types';
import { postUpdateProfile } from '@/app/profiles/_server_actions/postUpdateProfile';
import { BaseButton } from '@/components/atoms/BaseButton';
import { ButtonCheckbox } from '@/components/atoms/ButtonCheckbox';
import { InputFormArea } from '@/components/molecules/InputFormArea';
import { SelectFormArea } from '@/components/molecules/SelectFormArea';
import { TextFormArea } from '@/components/molecules/TextFormArea';
import { ContentWrapper } from '@/components/organisms/ContentWrapper';
import { getValidationErrorsByKey } from '@/lib/getValidationErrorsByKey';
import { theme } from '@/styles/theme';
import { useState } from 'react';
import styled from 'styled-components';

type Props = {
	profile: ProfileForEditDto;
	experiencedEntityMasters: FetchExperiencedEntityMasterResponse;
};

export const ProfileEdit = ({ profile, experiencedEntityMasters }: Props) => {
	const [inputProfile, setInputProfile] = useState<UpdateProfileDto>(profile);
	const [validationErrors, setValidationErrors] = useState<
		UpdateProfileResponseDto['errors']
	>([]);
	const [successFlashMessage, setSuccessFlashMessage] = useState<string>('');

	const updateInputProfile = (params: Partial<UpdateProfileDto>) => {
		setInputProfile({ ...inputProfile, ...params });
	};

	const handleUpdateProfile = async () => {
		setValidationErrors([]);

		const response = await postUpdateProfile(inputProfile);

		// バリデーションエラーがなければ、フラッシュメッセージを表示して編集画面の入力stateを更新
		if (Object.keys(response.errors).length === 0) {
			updateInputProfile(response.profile);
			setSuccessFlashMessage('プロフィールの更新に成功しました！');
			setTimeout(() => setSuccessFlashMessage(''), 2000);
		}
		setValidationErrors(response.errors);
	};

	const updateExperiencedProfessions = (professionId: string) => {
		const existsExperiencedProfession =
			!!inputProfile.experiencedProfessions.find(
				(ep) => ep.professionId === professionId,
			);

		if (existsExperiencedProfession) {
			const newExperiencedProfessions =
				inputProfile.experiencedProfessions.filter(
					(ep) => ep.professionId !== professionId,
				);
			updateInputProfile({
				...inputProfile,
				experiencedProfessions: newExperiencedProfessions,
			});
			return;
		}

		const newExperiencedProfessions = inputProfile.experiencedProfessions;
		newExperiencedProfessions.push({ professionId });
		updateInputProfile({
			...inputProfile,
			experiencedProfessions: newExperiencedProfessions,
		});
	};

	return (
		<>
			<ContentWrapper>
				{successFlashMessage && <div>{successFlashMessage}</div>}

				<LargeHeader>プロフィール</LargeHeader>

				{/* 基本情報 */}
				<MiddleHeader>基本情報</MiddleHeader>

				<FlexBox>
					<ColumnArea>
						<ColumnInputArea>
							<InputFormArea
								labelText="姓"
								type="text"
								name="last_name"
								placeholder="山田"
								value={inputProfile.lastName}
								onChange={(e) =>
									updateInputProfile({ lastName: e.target.value })
								}
								validationErrors={
									getValidationErrorsByKey(validationErrors, 'lastName') ?? []
								}
								width="full"
							/>
						</ColumnInputArea>
					</ColumnArea>

					<ColumnArea>
						<ColumnInputArea>
							<InputFormArea
								labelText="名"
								type="text"
								name="first_name"
								placeholder="太郎"
								value={inputProfile.firstName}
								onChange={(e) =>
									updateInputProfile({ firstName: e.target.value })
								}
								validationErrors={
									getValidationErrorsByKey(validationErrors, 'firstName') ?? []
								}
								width="full"
							/>
						</ColumnInputArea>
					</ColumnArea>
				</FlexBox>

				<InputArea>
					<ColumnInputArea>
						<InputFormArea
							labelText="生年月日"
							type="date"
							name="birthday"
							value={inputProfile.birthday}
							onChange={(e) => updateInputProfile({ birthday: e.target.value })}
							validationErrors={
								getValidationErrorsByKey(validationErrors, 'birthday') ?? []
							}
							width="full"
						/>
					</ColumnInputArea>
				</InputArea>

				<InputArea>
					<ColumnInputArea>
						<SelectFormArea
							id="current_employment"
							labelText="現在の雇用形態"
							defaultValue={inputProfile.currentEmployment}
							onChange={(e) =>
								updateInputProfile({
									currentEmployment: e.currentTarget
										.value as ProfileForEditDto['currentEmployment'],
								})
							}
							options={[
								{ value: 'fleelance', name: 'フリーランス' },
								{ value: 'fulltime', name: '正社員' },
								{ value: 'other', name: 'その他' },
							]}
							validationErrors={
								getValidationErrorsByKey(
									validationErrors,
									'currentEmployment',
								) ?? []
							}
							width="full"
						/>
					</ColumnInputArea>
				</InputArea>

				<InputArea>
					<ColumnInputArea>
						<InputFormArea
							labelText="稼働中/就業中の会社名"
							type="text"
							name="in_working_company_name"
							placeholder="フリーランス"
							value={inputProfile.inWorkingCompanyName}
							onChange={(e) =>
								updateInputProfile({ inWorkingCompanyName: e.target.value })
							}
							validationErrors={
								getValidationErrorsByKey(
									validationErrors,
									'inWorkingCompanyName',
								) ?? []
							}
							width="full"
						/>
					</ColumnInputArea>
				</InputArea>

				<InputArea>
					<ColumnInputArea>
						<InputFormArea
							labelText="電話番号"
							type="text"
							name="tel"
							placeholder="0001111222"
							value={inputProfile.tel}
							onChange={(e) => updateInputProfile({ tel: e.target.value })}
							validationErrors={
								getValidationErrorsByKey(validationErrors, 'tel') ?? []
							}
							width="full"
						/>
					</ColumnInputArea>
				</InputArea>

				{/* ご経験・スキル */}
				<MiddleHeader>ご経験・スキル</MiddleHeader>

				<InputArea>
					<ColumnInputArea>
						<InputFormArea
							labelText="直近の開発実績"
							type="text"
							name="latest_project"
							placeholder="国内最大級のECサイトの開発"
							value={inputProfile.latestProject}
							onChange={(e) =>
								updateInputProfile({ latestProject: e.target.value })
							}
							validationErrors={
								getValidationErrorsByKey(validationErrors, 'latestProject') ??
								[]
							}
							width="full"
						/>
					</ColumnInputArea>
				</InputArea>

				<InputArea>
					<ColumnInputArea>
						<InputFormArea
							labelText="現時間単価"
							type="text"
							name="current_hourly_wage"
							placeholder="5000"
							value={inputProfile.currentHourlyWage}
							onChange={(e) =>
								updateInputProfile({
									currentHourlyWage: Number(e.target.value),
								})
							}
							validationErrors={
								getValidationErrorsByKey(
									validationErrors,
									'currentHourlyWage',
								) ?? []
							}
							width="full"
						/>
					</ColumnInputArea>
				</InputArea>

				<InputArea>
					<ColumnInputArea>
						<SelectFormArea
							id="experienced_duration"
							labelText="エンジニア実務経験"
							defaultValue={inputProfile.experiencedDuration}
							onChange={(e) =>
								updateInputProfile({
									experiencedDuration: e.currentTarget
										.value as ProfileForEditDto['experiencedDuration'],
								})
							}
							options={[
								{ value: 'lessThanOneYear', name: '〜1年' },
								{ value: 'junior', name: '1〜2年' },
								{ value: 'middle', name: '2〜3年' },
								{ value: 'senior', name: '3〜5年' },
								{ value: 'expert', name: '10年〜' },
							]}
							validationErrors={
								getValidationErrorsByKey(
									validationErrors,
									'experiencedDuration',
								) ?? []
							}
							width="full"
						/>
					</ColumnInputArea>
				</InputArea>

				<InputArea>
					<ColumnInputArea>
						<label>職種</label>
						{/* <p>3つまで</p> */}
						<ExperiencesBox>
							{experiencedEntityMasters.professions.map((profession) => (
								<div key={profession.id}>
									<ButtonCheckbox
										aria-checked={
											!!inputProfile.experiencedProfessions.find(
												(ep) => ep.professionId === profession.id,
											)
										}
										onClick={() => updateExperiencedProfessions(profession.id)}
										title={profession.name}
									/>
								</div>
							))}
						</ExperiencesBox>

						{inputProfile.experiencedProfessions.map((ep) => (
							<ExperiencedDurationsBox key={ep.professionId}>
								<SelectFormArea
									key={ep.professionId}
									id={`experienced_duration_${ep.professionId}`}
									labelText={
										experiencedEntityMasters.professions.find(
											(p) => p.id === ep.professionId,
										)?.name
									}
									defaultValue={ep.experiencedDuration}
									onChange={(e) => {
										ep.experiencedDuration = e.currentTarget
											.value as ProfileForEditDto['experiencedDuration'];
										const index = inputProfile.experiencedProfessions.findIndex(
											(a) => a.professionId === ep.professionId,
										);

										const newExperiencedProfessions =
											inputProfile.experiencedProfessions.map((b, i) => {
												if (i === index) {
													return ep;
												}
												return b;
											});

										updateInputProfile({
											experiencedProfessions: newExperiencedProfessions,
										});
									}}
									options={[
										{ value: 'lessThanOneYear', name: '〜1年' },
										{ value: 'junior', name: '1〜2年' },
										{ value: 'middle', name: '2〜3年' },
										{ value: 'senior', name: '3〜5年' },
										{ value: 'expert', name: '10年〜' },
									]}
									validationErrors={
										getValidationErrorsByKey(
											validationErrors,
											'experiencedDuration',
										) ?? []
									}
									width="full"
								/>
							</ExperiencedDurationsBox>
						))}
					</ColumnInputArea>
				</InputArea>

				<InputArea>
					<ColumnInputArea>
						<TextFormArea
							id="self_promotion"
							labelText="自己PR"
							placeholder=""
							value={inputProfile.selfPromotion}
							onChange={(e) =>
								updateInputProfile({ selfPromotion: e.target.value })
							}
							validationErrors={
								getValidationErrorsByKey(validationErrors, 'selfPromotion') ??
								[]
							}
							width="full"
						/>
					</ColumnInputArea>
				</InputArea>

				<ButtonArea>
					<BaseButton
						title="保存する"
						onClick={handleUpdateProfile}
						width="full"
					/>
				</ButtonArea>
			</ContentWrapper>
		</>
	);
};

const LargeHeader = styled.h1`
	width: ${({ theme }) => theme.size.threeQuarters};
	padding-bottom: ${({ theme }) => theme.size.p8};
	font-size: ${({ theme }) => theme.size.p20};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	text-align: center;
	border-bottom: 1px dotted rgb(230, 230, 230);
`;
LargeHeader.defaultProps = { theme: theme };

const MiddleHeader = styled.h2`
	width: ${({ theme }) => theme.size.threeQuarters};
	padding-bottom: ${({ theme }) => theme.size.p8};
	font-size: ${({ theme }) => theme.size.p20};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
MiddleHeader.defaultProps = { theme: theme };

const FlexBox = styled.div`
	width: ${({ theme }) => theme.size.threeQuarters};
	display: flex;
	justify-content: space-between;
`;
FlexBox.defaultProps = { theme: theme };

const InputLabel = styled.label`
	font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
InputLabel.defaultProps = { theme: theme };

const ColumnArea = styled.div`
	width: 45%;
`;
ColumnArea.defaultProps = { theme: theme };

const ColumnInputArea = styled.div`
	width: ${({ theme }) => theme.size.full};
`;
ColumnInputArea.defaultProps = { theme: theme };

const InputArea = styled.div`
	width: ${({ theme }) => theme.size.threeQuarters};
`;
InputArea.defaultProps = { theme: theme };

const ButtonArea = styled.div`
	width: ${({ theme }) => theme.size.quarter};
`;
ButtonArea.defaultProps = { theme: theme };

const ExperiencesBox = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${({ theme }) => theme.size.p8};
`;
ExperiencesBox.defaultProps = { theme: theme };

const ExperiencedDurationsBox = styled.div`
	margin-top: ${({ theme }) => theme.size.p8};
`;
ExperiencedDurationsBox.defaultProps = { theme: theme };

const ExperiencedDurationsUl = styled.ul`
	grid-template-columns: repeat(6, 1fr);
`;
ExperiencedDurationsUl.defaultProps = { theme: theme };
