module.exports = (webSiteUrl, name, email, token) => `
<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <!-- LOGO -->
    <tr>
        <td bgcolor="#b59588" align="center">
            <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 600px"
            >
                <tr>
                    <td
                        align="center"
                        valign="top"
                        style="padding: 40px 10px 40px 10px"
                    ></td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td bgcolor="#b59588" align="center" style="padding: 0px 10px 0px 10px">
            <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 600px"
            >
                <tr>
                    <td
                        bgcolor="#ffffff"
                        align="center"
                        valign="top"
                        style="
                            padding: 40px 20px 20px 20px;
                            border-radius: 4px 4px 0px 0px;
                            color: #111111;
                            font-family: 'Lato', Helvetica, Arial, sans-serif;
                            font-size: 48px;
                            font-weight: 400;
                            letter-spacing: 4px;
                            line-height: 48px;
                        "
                    >
                        <h1
                            style="font-size: 48px; font-weight: 400; margin: 2"
                        >
                            Olá ${name}!
                        </h1>
                        <img
                            src="cid:unique@logo"
                            alt="Sweet-D logo"
                            width="125"
                            height="120"
                            style="
                                display: block;
                                border: 0px;
                                border: 0;
                                border-radius: 0.5rem;
                                height: auto;
                                line-height: 100%;
                                outline: none;
                                text-decoration: none;
                            "
                        />
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td bgcolor="#b59588" align="center" style="padding: 0px 10px 0px 10px">
            <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="max-width: 600px"
            >
                <tr>
                    <td
                        bgcolor="#ffffff"
                        align="left"
                        style="
                            padding: 20px 30px 40px 30px;
                            color: #666666;
                            font-family: 'Lato', Helvetica, Arial, sans-serif;
                            font-size: 18px;
                            font-weight: 400;
                            line-height: 25px;
                        "
                    >
                        <p style="margin: 0">
                            Para iniciar o processo de troca de senha da sua
                            conta, clique no link abaixo.
                        </p>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#ffffff" align="left">
                        <table
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                        >
                            <tr>
                                <td
                                    bgcolor="#ffffff"
                                    align="center"
                                    style="padding: 20px 30px 60px 30px"
                                >
                                    <table
                                        border="0"
                                        cellspacing="0"
                                        cellpadding="0"
                                    >
                                        <tr>
                                            <td
                                                align="center"
                                                style="border-radius: 3px"
                                                bgcolor="#b59588"
                                            >
                                                <a
                                                    href="${webSiteUrl}/recovery-password/change/${email}/${token}"
                                                    target="_blank"
                                                    style="
                                                        font-size: 20px;
                                                        font-family: Helvetica,
                                                            Arial, sans-serif;
                                                        color: #ffffff;
                                                        text-decoration: none;
                                                        color: #ffffff;
                                                        text-decoration: none;
                                                        padding: 15px 25px;
                                                        border-radius: 2px;
                                                        border: 1px solid
                                                            #b59588;
                                                        display: inline-block;
                                                    "
                                                    >Trocar Senha</a
                                                >
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- COPY -->
                <tr>
                    <td
                        bgcolor="#ffffff"
                        align="left"
                        style="
                            padding: 0px 30px 0px 30px;
                            color: #666666;
                            font-family: 'Lato', Helvetica, Arial, sans-serif;
                            font-size: 18px;
                            font-weight: 400;
                            line-height: 25px;
                        "
                    >
                        <p style="margin: 0">
                            Se isso não funcionar, copie e cole o seguinte link
                            no seu navegador:
                        </p>
                    </td>
                </tr>
                <!-- COPY -->
                <tr>
                    <td
                        bgcolor="#ffffff"
                        align="left"
                        style="
                            padding: 20px 30px 20px 30px;
                            color: #666666;
                            font-family: 'Lato', Helvetica, Arial, sans-serif;
                            font-size: 18px;
                            font-weight: 400;
                            line-height: 25px;
                        "
                    >
                        <p style="margin: 0">
                            <a
                                href="${webSiteUrl}/recovery-password/change/${email}/${token}"
                                target="_blank"
                                style="color: #b59588"
                                >${webSiteUrl}/recovery-password/change/${email}/${token}</a
                            >
                        </p>
                    </td>
                </tr>
                <tr>
                    <td
                        bgcolor="#ffffff"
                        align="left"
                        style="
                            padding: 0px 30px 20px 30px;
                            color: #666666;
                            font-family: 'Lato', Helvetica, Arial, sans-serif;
                            font-size: 18px;
                            font-weight: 400;
                            line-height: 25px;
                        "
                    >
                        <p style="margin: 0">
                            Se você tiver alguma dúvida, responda a este e-mail
                            - ficaremos sempre felizes em ajudar.
                        </p>
                    </td>
                </tr>
                <tr>
                    <td
                        bgcolor="#ffffff"
                        align="left"
                        style="
                            padding: 0px 30px 40px 30px;
                            border-radius: 0px 0px 4px 4px;
                            color: #666666;
                            font-family: 'Lato', Helvetica, Arial, sans-serif;
                            font-size: 18px;
                            font-weight: 400;
                            line-height: 25px;
                        "
                    >
                        <p style="margin: 0">Sweet-D</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`;
