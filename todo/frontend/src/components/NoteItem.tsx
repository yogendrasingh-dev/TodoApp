import { FC } from 'react';
import AppButton from './AppButton';

interface Props {
	title: string;
	description?: string;
	onEditClick?(): void;
	onDeleteClick?(): void;
	onViewClick?(): void;
}

const NoteItem: FC<Props> = ({ title, onEditClick, onDeleteClick, onViewClick, description }) => {
	return (
		<div className="bg-white shadow-md rounded p-5">
			<p className="font-semibold text-gray-700 text-lg mb-4">{title}</p>
			{description ? <p className="ml-2 py-2 text-lg">{description}</p> : null}
			<div className="space-x-4">
				<AppButton title={description ? 'Hide' : 'View'} type="regular" onClick={onViewClick} />
				<AppButton title="Edit" type="normal" onClick={onEditClick} />
				<AppButton title="Delete" type="danger" onClick={onDeleteClick} />
			</div>
		</div>
	);
};

export default NoteItem;
