	useEffect(() => {
		const postApiData = async () => {
			const apiOptions =
			{
				method: 'POST',
				headers: { 'content-type': 'application/x-www-form-urlencoded' },
				data: { Mobile: '9140198644' },
				url: 'http://license.dataman.in/webservice2.asmx/GetOTPForGrahaakField',
			};
			const apiResp = await axios(apiOptions)
			console.log(apiResp.data);
		};
		postApiData();
	}, []); 