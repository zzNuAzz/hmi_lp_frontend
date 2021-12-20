import React from "react";
import { useDropzone } from "react-dropzone";
import { Circle } from 'rc-progress';
import { RingLoader } from "react-spinners";

export default function Dropzone({
	video: [video, removeVideo],
	onDrop,
	accept,
	multiple,
	uploading,
	uploadProgress,
}) {

	const _onDrop = (...args) => {
		if (video) return;
		onDrop(...args)
	}

	const { getRootProps, getInputProps, open } = useDropzone({
		onDrop: _onDrop,
		accept,
		multiple,
		noClick: true
	});

	const _open = () => {
		if(!video) open()
	}

	const _removeVideo = e => {
		e.stopPropagation();
		removeVideo(e);
	};

	const _renderDragHere = () => (
		<div className="Dropzone__box-container">
			<div className="Dropzone__box-content">DRAG YOUR VIDEO IN HERE</div>
			<div className="Dropzone__box-icon upload">
				<i className="fas fa-upload"></i>
			</div>
		</div>
	);

	const _renderFileName = () => (
		<div className="Dropzone__box-container">
			<div className="Dropzone__box-content">
				<div>VIDEO'S NAME</div>
				<div className="Dropzone__box-content-filename">
					{video.name || "..."}
				</div>
			</div>
			{uploading ? (
				<div className="Dropzone__box-uploading uploading">
					{uploadProgress < 100 ? (
						<div className="Dropzone__box-progress">
							<Circle
								percent={uploadProgress}
								strokeWidth="4"
								strokeColor={"#25D366"}
							/>
							<div className="Dropzone__box-progress-info">
								Uploading <br />
								{uploadProgress}%
							</div>
						</div>
					) : (
						<div className="Dropzone__box-progress">
							<RingLoader size={130} color={"#25D366"} />
							<div className="Dropzone__box-progress-info">
								Processing
							</div>
						</div>
					)}
				</div>
			) : (
				<div className="Dropzone__box-icon check">
					<i className="fas fa-check"></i>
				</div>
			)}
			<div className="Dropzone__box-remove" onClick={_removeVideo}>
				<i className="fas fa-times"></i>
			</div>
		</div>
	);

	return (
		<div className="Dropzone" {...getRootProps()}  onClick={_open}>
			<input {...getInputProps()} />
			{video ? _renderFileName() : _renderDragHere()}
		</div>
	);
}
