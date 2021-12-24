import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dropzone } from "@components/";
import { toast } from "react-toastify";
import { useGlobalState } from "@hooks/";
import { setVideoInput } from "@actions/global";
import { useNavigate } from "react-router";
import API from "@api/";
import axios from "axios";
import { setCaption, setSubtitle } from "actions/global";

export default function HomeContent() {
	const navigate = useNavigate();
	const [{ videoInput: video }, dispatch] = useGlobalState();

	const [uploading, setUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(100);
	const uploadToken = useRef(null);

	const _onDrop = useCallback(acceptedFiles => {
		acceptedFiles.forEach(file => {
			const reader = new FileReader();

			reader.onabort = () => toast.warning("File reading was aborted");
			reader.onerror = () => toast.error("File reading has failed");
			reader.onload = () => {
				dispatch(setVideoInput(file));

				_revokeObjectURL(file?.preview);
				_revokeObjectURL(video?.preview);
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				});
				if (uploadToken.current !== null) {
					uploadToken.current.cancel();
				}

				setUploading(true);
				setUploadProgress(0);
				uploadToken.current = axios.CancelToken.source();
				API.uploadVideo(file, {
					cancelToken: uploadToken.current.token,
					onUploadProgress: _onUploadProgress,
				})
					.then(d => {
						dispatch(setSubtitle(d?.subtitles || []));
						dispatch(setCaption(d?.captions || {}));
					})
					.catch(err => {
						dispatch(setVideoInput(null));
						toast.error(err?.message || err);
					})
					.finally(() => {
						setUploading(false);
					});
			};
			reader.readAsArrayBuffer(file);
		});
	}, []);

	const _removeVideo = e => {
		_cancelUpload();
		dispatch(setVideoInput(null));
	};

	const _download = e => {
		alert("Download");
	};

	const _play = e => {
		navigate("/play");
	};

	const _revokeObjectURL = url => {
		if (url) URL.revokeObjectURL(url);
	};

	const make99percent = useRef();
	const _onUploadProgress = progressEvent => {
		const { loaded, total } = progressEvent;
		const realProgress = Math.floor((loaded / total) * 100);

		//fake for fun
		if (!make99percent.current) {
			if (realProgress === 100) {
				setUploadProgress(99);
				make99percent.current = setTimeout(() => {
					setUploadProgress(100);
					make99percent.current = null;
				}, 1000);
			}
		} else {
			setUploadProgress(realProgress);
		}
	};

	const _cancelUpload = () => {
		if (uploadToken.current !== null) {
			uploadToken.current.cancel();
			uploadToken.current = null;
		}
	};

	const uploadRef = useRef();
	useEffect(() => {
		uploadRef.current = uploading;
	}, [uploading]);

	useEffect(() => {
		return () => {
			if (uploadRef.current) {
				dispatch(setVideoInput(null));
			}
			_cancelUpload();
		};
	}, []);

	const _renderActionBox = () => (
		<div className="HomeContent__box-action">
			<div className="HomeContent__btn-download" onClick={_download}>
				<i className="fas fa-download"></i>
			</div>
			<div className="HomeContent__btn-play" onClick={_play}>
				<i className="fas fa-play-circle"></i>
			</div>
		</div>
	);

	return (
		<div className="HomePage__HomeContent">
			<div className="UploadBox">
				<Dropzone
					accept={["video/*"]}
					video={[video, _removeVideo]}
					multiple={false}
					onDrop={_onDrop}
					uploading={uploading}
					uploadProgress={uploadProgress}
				/>
				{video && !uploading && _renderActionBox()}
			</div>
		</div>
	);
}
