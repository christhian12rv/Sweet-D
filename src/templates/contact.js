module.exports = (name, email, message) => `
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
                            Nova mensagem de ${name}
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
                            Mensagem: ${message}
                        </p>
                    </td>
                </tr>
                <!-- COPY -->
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
                        <p style="margin: 0">${email}</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`;
