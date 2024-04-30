'use client';

import { FetchExperiencedEntityMasterResponse } from '@/api/experienced_entity_masters/@types';
import {
	ProfileForEditDto,
	UpdateProfileDto,
	UpdateProfileResponseDto,
} from '@/api/profiles/@types';
import { BaseBox } from '@/components/atoms/BaseBox';
import { BaseButton } from '@/components/atoms/BaseButton';
import { ButtonCheckbox } from '@/components/atoms/ButtonCheckbox';
import { InputFormArea } from '@/components/molecules/InputFormArea';
import { SelectFormArea } from '@/components/molecules/SelectFormArea';
import { TextFormArea } from '@/components/molecules/TextFormArea';
import { getValidationErrorsByKey } from '@/lib/getValidationErrorsByKey';
import { theme } from '@/styles/theme';
import { useState } from 'react';
import styled from 'styled-components';
import { postUpdateProfile } from '../../../_server_actions/postUpdateProfile';
import { BaseLayout } from '@/app/mypage/_components/BaseLayout';
import { LargeHeader } from '@/app/mypage/_components/LargeHeader';
import { ProfileSelectValues } from '@/api/profile_select_values/@types';

type Props = {
	profile: ProfileForEditDto;
	profileSelectValues: ProfileSelectValues;
	experiencedEntityMasters: FetchExperiencedEntityMasterResponse;
};

export const ProfileEdit = ({
	profile,
	profileSelectValues,
	experiencedEntityMasters,
}: Props) => {
	const [inputProfile, setInputProfile] = useState<ProfileForEditDto>(profile);
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

	const updateExperiencedProgrammingLanguages = (
		programmingLanguageId: string,
	) => {
		const existsExperiencedProgrammingLanguage =
			!!inputProfile.experiencedProgrammingLanguages.find(
				(ep) => ep.programmingLanguageId === programmingLanguageId,
			);

		if (existsExperiencedProgrammingLanguage) {
			const newExperiencedProgrammingLanguages =
				inputProfile.experiencedProgrammingLanguages.filter(
					(ep) => ep.programmingLanguageId !== programmingLanguageId,
				);
			updateInputProfile({
				...inputProfile,
				experiencedProgrammingLanguages: newExperiencedProgrammingLanguages,
			});
			return;
		}

		const newExperiencedProgrammingLanguages =
			inputProfile.experiencedProgrammingLanguages;
		newExperiencedProgrammingLanguages.push({ programmingLanguageId });
		updateInputProfile({
			...inputProfile,
			experiencedProgrammingLanguages: newExperiencedProgrammingLanguages,
		});
	};

	const updateSkillSheet = (fileInput: File) => {
		let reader: FileReader | null = new FileReader();
		reader.onloadend = () => {
			// base64のデータを生成し、入力値としてセットする。
			const base64 = reader && reader.result;
			if (base64 && typeof base64 === 'string') {
				updateInputProfile({
					...inputProfile,
					skillsheetName: fileInput.name,
					skillsheetData: base64,
				});
			}
		};
		reader.readAsDataURL(fileInput);
	};

	return (
		<>
			<BaseLayout>
				{successFlashMessage && <div>{successFlashMessage}</div>}

				<LargeHeader title="プロフィール" />

				{/* 基本情報 */}
				<MiddleHeader>基本情報</MiddleHeader>

				<FlexBox>
					<BaseBox width="fortyFive">
						<InputFormArea
							labelText="姓"
							type="text"
							name="last_name"
							placeholder="山田"
							value={inputProfile.lastName}
							onChange={(e) => updateInputProfile({ lastName: e.target.value })}
							validationErrors={
								getValidationErrorsByKey(validationErrors, 'lastName') ?? []
							}
						/>
					</BaseBox>

					<BaseBox width="fortyFive">
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
						/>
					</BaseBox>
				</FlexBox>

				<BaseBox width="threeQuarters">
					<InputFormArea
						labelText="生年月日"
						type="date"
						name="birthday"
						value={inputProfile.birthday}
						onChange={(e) => updateInputProfile({ birthday: e.target.value })}
						validationErrors={
							getValidationErrorsByKey(validationErrors, 'birthday') ?? []
						}
					/>
				</BaseBox>

				<BaseBox width="threeQuarters">
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
						options={profileSelectValues.currentEmployment}
						validationErrors={
							getValidationErrorsByKey(validationErrors, 'currentEmployment') ??
							[]
						}
					/>
				</BaseBox>

				<BaseBox width="threeQuarters">
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
				</BaseBox>

				<BaseBox width="threeQuarters">
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
				</BaseBox>

				{/* ご経験・スキル */}
				<MiddleHeader>ご経験・スキル</MiddleHeader>

				<BaseBox width="threeQuarters">
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
							getValidationErrorsByKey(validationErrors, 'latestProject') ?? []
						}
						width="full"
					/>
				</BaseBox>

				<BaseBox width="threeQuarters">
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
							getValidationErrorsByKey(validationErrors, 'currentHourlyWage') ??
							[]
						}
						width="full"
					/>
				</BaseBox>

				<BaseBox width="threeQuarters">
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
						options={profileSelectValues.experiencedDuration}
						validationErrors={
							getValidationErrorsByKey(
								validationErrors,
								'experiencedDuration',
							) ?? []
						}
						width="full"
					/>
				</BaseBox>

				<BaseBox width="threeQuarters">
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
								id={`experienced_profession_duration_${ep.professionId}`}
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
								options={profileSelectValues.experiencedEntityDuration}
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
				</BaseBox>

				<BaseBox width="threeQuarters">
					<label>開発言語</label>
					<ExperiencesBox>
						{experiencedEntityMasters.programmingLanguages.map(
							(programmingLanguage) => (
								<div key={programmingLanguage.id}>
									<ButtonCheckbox
										aria-checked={
											!!inputProfile.experiencedProgrammingLanguages.find(
												(ep) =>
													ep.programmingLanguageId === programmingLanguage.id,
											)
										}
										onClick={() =>
											updateExperiencedProgrammingLanguages(
												programmingLanguage.id,
											)
										}
										title={programmingLanguage.name}
									/>
								</div>
							),
						)}
					</ExperiencesBox>

					{inputProfile.experiencedProgrammingLanguages.map((ep) => (
						<ExperiencedDurationsBox key={ep.programmingLanguageId}>
							<SelectFormArea
								key={ep.programmingLanguageId}
								id={`experienced_programming_language_duration_${ep.programmingLanguageId}`}
								labelText={
									experiencedEntityMasters.programmingLanguages.find(
										(p) => p.id === ep.programmingLanguageId,
									)?.name
								}
								defaultValue={ep.experiencedDuration}
								onChange={(e) => {
									ep.experiencedDuration = e.currentTarget
										.value as ProfileForEditDto['experiencedDuration'];
									const index =
										inputProfile.experiencedProgrammingLanguages.findIndex(
											(a) =>
												a.programmingLanguageId === ep.programmingLanguageId,
										);

									const newExperiencedProgrammingLanguages =
										inputProfile.experiencedProgrammingLanguages.map((b, i) => {
											if (i === index) {
												return ep;
											}
											return b;
										});

									updateInputProfile({
										experiencedProgrammingLanguages:
											newExperiencedProgrammingLanguages,
									});
								}}
								options={profileSelectValues.experiencedEntityDuration}
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
				</BaseBox>

				<BaseBox width="threeQuarters">
					{inputProfile.skillsheetName && (
						<a
							href={inputProfile.skillsheetData}
							download={inputProfile.skillsheetName}
						>
							{inputProfile.skillsheetName}
						</a>
					)}
					<label htmlFor="skillsheet">スキルシート</label>
					<input
						id="skillsheet"
						type="file"
						onChange={(e) => {
							if (!e.target.files) return;

							updateSkillSheet(e.target.files[0]);
						}}
					/>
				</BaseBox>

				<BaseBox width="threeQuarters">
					<TextFormArea
						id="self_promotion"
						labelText="自己PR"
						placeholder=""
						value={inputProfile.selfPromotion}
						onChange={(e) =>
							updateInputProfile({ selfPromotion: e.target.value })
						}
						validationErrors={
							getValidationErrorsByKey(validationErrors, 'selfPromotion') ?? []
						}
						width="full"
					/>
				</BaseBox>

				<BaseBox width="quarter">
					<BaseButton
						title="保存する"
						onClick={handleUpdateProfile}
						width="full"
					/>
				</BaseBox>
			</BaseLayout>
		</>
	);
};

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
