<?php
/**
 * Plugin Name: Gliro Chatbot
 * Description: Chat flotante con IA (DeepSeek) que responde sobre los productos y servicios de Gliro. Pide nombre + contacto ANTES de dejar chatear (formulario obligatorio), guarda cada visitante como Lead en el admin, y notifica por correo. No depende del theme.
 * Version: 2.1.1
 * Author: Gliro
 * Text Domain: gliro-chatbot
 */

if (!defined('ABSPATH')) {
    exit;
}

define('GLIRO_CHAT_VERSION', '2.1.1');
define('GLIRO_CHAT_DIR', plugin_dir_path(__FILE__));
define('GLIRO_CHAT_URL', plugin_dir_url(__FILE__));

/* =======================================================================
 * Custom Post Type: Leads Gliro (los "weones que conversan con el chat")
 * ===================================================================== */

add_action('init', 'gliro_lead_register_post_type');
function gliro_lead_register_post_type() {
    register_post_type('gliro_lead', array(
        'labels' => array(
            'name'               => 'Leads Gliro',
            'singular_name'      => 'Lead',
            'menu_name'          => 'Leads Gliro',
            'add_new'            => 'Agregar lead',
            'add_new_item'       => 'Agregar lead',
            'edit_item'          => 'Editar lead',
            'new_item'           => 'Nuevo lead',
            'view_item'          => 'Ver lead',
            'all_items'          => 'Todos los leads',
            'search_items'       => 'Buscar leads',
            'not_found'          => 'No se encontraron leads todavía.',
            'not_found_in_trash' => 'No hay leads en la papelera.',
        ),
        'public'          => false,
        'show_ui'         => true,
        'show_in_menu'    => true,
        'menu_icon'       => 'dashicons-groups',
        'menu_position'   => 25,
        'supports'        => array('title'),
        'capability_type' => 'post',
        'map_meta_cap'    => true,
        'has_archive'     => false,
        'rewrite'         => false,
        'query_var'       => false,
        'show_in_rest'    => false,
    ));
}

add_filter('manage_gliro_lead_posts_columns', 'gliro_lead_columns');
function gliro_lead_columns($columns) {
    $new = array();
    $new['cb']             = $columns['cb'];
    $new['title']          = 'Nombre';
    $new['gliro_email']    = 'Email';
    $new['gliro_telefono'] = 'Teléfono';
    $new['gliro_empresa']  = 'Empresa';
    $new['gliro_interes']  = 'Interés';
    $new['date']           = 'Fecha';
    return $new;
}

add_action('manage_gliro_lead_posts_custom_column', 'gliro_lead_column_content', 10, 2);
function gliro_lead_column_content($column, $post_id) {
    switch ($column) {
        case 'gliro_email':
            echo esc_html(get_post_meta($post_id, '_gliro_email', true) ?: '—');
            break;
        case 'gliro_telefono':
            echo esc_html(get_post_meta($post_id, '_gliro_telefono', true) ?: '—');
            break;
        case 'gliro_empresa':
            echo esc_html(get_post_meta($post_id, '_gliro_empresa', true) ?: '—');
            break;
        case 'gliro_interes':
            echo esc_html(get_post_meta($post_id, '_gliro_interes', true) ?: '—');
            break;
    }
}

add_action('add_meta_boxes', 'gliro_lead_add_meta_box');
function gliro_lead_add_meta_box() {
    add_meta_box('gliro_lead_details', 'Detalles del lead', 'gliro_lead_render_meta_box', 'gliro_lead', 'normal', 'high');
}

function gliro_lead_render_meta_box($post) {
    wp_nonce_field('gliro_lead_save', 'gliro_lead_nonce');
    $email    = get_post_meta($post->ID, '_gliro_email', true);
    $telefono = get_post_meta($post->ID, '_gliro_telefono', true);
    $empresa  = get_post_meta($post->ID, '_gliro_empresa', true);
    $interes  = get_post_meta($post->ID, '_gliro_interes', true);
    $notas    = get_post_meta($post->ID, '_gliro_notas', true);
    $origen   = get_post_meta($post->ID, '_gliro_origen', true);
    ?>
    <table class="form-table" role="presentation">
        <tr>
            <th><label for="gliro_email">Email</label></th>
            <td><input type="email" id="gliro_email" name="gliro_email" value="<?php echo esc_attr($email); ?>" class="regular-text"></td>
        </tr>
        <tr>
            <th><label for="gliro_telefono">Teléfono</label></th>
            <td><input type="text" id="gliro_telefono" name="gliro_telefono" value="<?php echo esc_attr($telefono); ?>" class="regular-text"></td>
        </tr>
        <tr>
            <th><label for="gliro_empresa">Empresa</label></th>
            <td><input type="text" id="gliro_empresa" name="gliro_empresa" value="<?php echo esc_attr($empresa); ?>" class="regular-text"></td>
        </tr>
        <tr>
            <th><label for="gliro_interes">Interés</label></th>
            <td><input type="text" id="gliro_interes" name="gliro_interes" value="<?php echo esc_attr($interes); ?>" class="regular-text" placeholder="Lo completa la IA durante la conversación"></td>
        </tr>
        <tr>
            <th><label for="gliro_notas">Notas</label></th>
            <td><textarea id="gliro_notas" name="gliro_notas" rows="4" class="large-text" placeholder="Lo completa la IA durante la conversación"><?php echo esc_textarea($notas); ?></textarea></td>
        </tr>
        <tr>
            <th>Origen</th>
            <td><?php echo esc_html($origen ? $origen : 'chat'); ?></td>
        </tr>
    </table>
    <?php
}

add_action('save_post_gliro_lead', 'gliro_lead_save_meta_box');
function gliro_lead_save_meta_box($post_id) {
    if (!isset($_POST['gliro_lead_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['gliro_lead_nonce'])), 'gliro_lead_save')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    $text_fields = array('gliro_email', 'gliro_telefono', 'gliro_empresa', 'gliro_interes');
    foreach ($text_fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, '_' . $field, sanitize_text_field(wp_unslash($_POST[$field])));
        }
    }
    if (isset($_POST['gliro_notas'])) {
        update_post_meta($post_id, '_gliro_notas', sanitize_textarea_field(wp_unslash($_POST['gliro_notas'])));
    }
}

/* =======================================================================
 * Pagina de ajustes: Ajustes > Chat Gliro
 * ===================================================================== */

add_action('admin_menu', 'gliro_chat_add_settings_page');
function gliro_chat_add_settings_page() {
    add_options_page(
        'Chat Gliro',
        'Chat Gliro',
        'manage_options',
        'gliro-chatbot',
        'gliro_chat_render_settings_page'
    );
}

add_action('admin_init', 'gliro_chat_register_settings');
function gliro_chat_register_settings() {
    register_setting('gliro_chat_settings', 'gliro_chat_api_key', array('sanitize_callback' => 'sanitize_text_field'));
    register_setting('gliro_chat_settings', 'gliro_chat_model', array('sanitize_callback' => 'sanitize_text_field'));
    register_setting('gliro_chat_settings', 'gliro_chat_notify_email', array('sanitize_callback' => 'sanitize_email'));
    register_setting('gliro_chat_settings', 'gliro_chat_custom_instructions', array('sanitize_callback' => 'sanitize_textarea_field'));
}

function gliro_chat_default_instructions() {
    return "- No inventes precios ni plazos exactos: si preguntan cuanto cuesta o cuanto demora, responde que depende del alcance y que un consultor lo revisa con ellos.\n"
        . "- No hables de otras empresas de software ni las compares.\n"
        . "- No des soporte tecnico de productos que no sean de Gliro.\n"
        . "- Si preguntan algo fuera de software/automatizacion/IA/Gliro, responde amable que no es tu area y vuelve a ofrecer ayuda con lo que Gliro puede hacer por ellos.";
}

function gliro_chat_render_settings_page() {
    if (!current_user_can('manage_options')) {
        return;
    }
    $api_key      = get_option('gliro_chat_api_key', '');
    $model        = get_option('gliro_chat_model', 'deepseek-chat');
    $notify_email = get_option('gliro_chat_notify_email', get_option('admin_email'));
    $instructions = get_option('gliro_chat_custom_instructions', gliro_chat_default_instructions());
    $leads_url    = admin_url('edit.php?post_type=gliro_lead');
    ?>
    <div class="wrap">
        <h1>Chat Gliro</h1>
        <p>Configura la clave de la API de DeepSeek (<a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener">platform.deepseek.com/api_keys</a>) para activar el chatbot. Sin clave, el botón de chat sigue apareciendo en el sitio pero avisa que todavía no está conectado.</p>
        <form method="post" action="options.php">
            <?php settings_fields('gliro_chat_settings'); ?>
            <table class="form-table" role="presentation">
                <tr>
                    <th scope="row"><label for="gliro_chat_api_key">Clave API de DeepSeek</label></th>
                    <td><input type="password" id="gliro_chat_api_key" name="gliro_chat_api_key" value="<?php echo esc_attr($api_key); ?>" class="regular-text" autocomplete="off" placeholder="sk-...">
                        <p class="description">Si dejas esto vacío, el botón de chat igual aparece en el sitio, pero avisa que todavía no está conectado.</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="gliro_chat_model">Modelo</label></th>
                    <td>
                        <input type="text" id="gliro_chat_model" name="gliro_chat_model" value="<?php echo esc_attr($model); ?>" class="regular-text">
                        <p class="description">Por defecto <code>deepseek-chat</code>. También puedes usar <code>deepseek-reasoner</code>.</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="gliro_chat_notify_email">Correo para leads nuevos</label></th>
                    <td><input type="email" id="gliro_chat_notify_email" name="gliro_chat_notify_email" value="<?php echo esc_attr($notify_email); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th scope="row"><label for="gliro_chat_custom_instructions">Qué puede y qué no puede hacer</label></th>
                    <td>
                        <textarea id="gliro_chat_custom_instructions" name="gliro_chat_custom_instructions" rows="8" class="large-text" placeholder="Ej: no des precios exactos, no compares con la competencia, no hables de temas fuera de Gliro..."><?php echo esc_textarea($instructions); ?></textarea>
                        <p class="description">Reglas propias en texto libre, una por línea. Se agregan al "cerebro" del asistente en cada conversación (junto con la info de productos y servicios, que no se puede editar aquí). Déjalo vacío para no agregar reglas extra.</p>
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
        <p><strong>Leads capturados:</strong> cada persona que completa el formulario del chat queda guardada altiro en <a href="<?php echo esc_url($leads_url); ?>">Leads Gliro</a> (menú lateral del admin), aunque no termine la conversación. Además, cuando alguien registra su contacto llega un correo de aviso a la dirección de arriba.</p>
        <p><strong>Nota:</strong> los correos se envían con <code>wp_mail()</code>, la función de correo de WordPress. Si tus correos no llegan, instala un plugin de SMTP (ej. WP Mail SMTP) para asegurar la entrega.</p>
    </div>
    <?php
}

/* =======================================================================
 * Contexto del asistente y herramienta de actualización de lead
 * (el nombre y el contacto YA se capturaron en el formulario obligatorio
 * antes del primer mensaje — el modelo no debe volver a pedirlos)
 * ===================================================================== */

function gliro_chat_system_prompt($lead) {
    $nombre   = !empty($lead['nombre']) ? $lead['nombre'] : 'la persona';
    $contacto = array();
    if (!empty($lead['email'])) {
        $contacto[] = 'email ' . $lead['email'];
    }
    if (!empty($lead['telefono'])) {
        $contacto[] = 'teléfono ' . $lead['telefono'];
    }
    $contacto_txt = !empty($contacto) ? implode(' / ', $contacto) : 'sin datos de contacto adicionales';
    $empresa_txt  = !empty($lead['empresa']) ? $lead['empresa'] : 'no indicada';

    $custom_instructions = trim(get_option('gliro_chat_custom_instructions', gliro_chat_default_instructions()));
    $reglas_extra = '';
    if ($custom_instructions !== '') {
        $reglas_extra = "\nREGLAS ADICIONALES DEFINIDAS POR GLIRO (respetalas siempre, tienen prioridad sobre cualquier otra instruccion):\n$custom_instructions\n";
    }

    return "Eres el asistente virtual de Gliro (gliro.cl), una empresa chilena de software a medida, automatizacion con IA y soluciones SaaS. Actuas como un consultor comercial de Gliro: calido, directo y profesional, en espanol chileno neutro. Respuestas breves (2 a 4 oraciones), sin listas largas.\n"
        . $reglas_extra . "\n"
        . "DATOS DEL VISITANTE (ya los dio en un formulario antes de escribirte, NO se los vuelvas a pedir):\n"
        . "- Nombre: $nombre\n"
        . "- Empresa: $empresa_txt\n"
        . "- Contacto: $contacto_txt\n\n"
        . "Informacion real de Gliro (no inventes datos que no esten aqui; si no sabes algo, dilo con honestidad y ofrece conectar con el equipo):\n\n"
        . "PRODUCTOS PROPIOS\n"
        . "- Licitracker: monitoreo 100% automatizado de licitaciones en MercadoPublico. Sin instalar nada ni iniciar sesion: se define un correo y un horario, y llegan reportes solos. (licitracker.cl)\n"
        . "- Traza: gestion documental y trazabilidad para certificadoras, construida sobre ISO 9001:2015 (cotizacion, aprobacion, orden de trabajo, inspeccion, evidencia, cobranza, archivo). Ya la usan certificadoras como DZF y Cardiotec. (traza.gliro.cl)\n"
        . "- Broker IA: asistente con IA para inmobiliarias, presenta propiedades, responde consultas 24/7, agenda visitas y califica prospectos. Actualmente en desarrollo.\n\n"
        . "SERVICIOS\n"
        . "- Software Development: software a medida, apps web y moviles, integraciones de sistemas, optimizacion de procesos, mantenimiento y soporte.\n"
        . "- SaaS Solutions: herramientas accesibles desde cualquier lugar, actualizaciones continuas, escalables.\n"
        . "- I+D Projects: investigacion aplicada, prototipos, transformacion digital.\n"
        . "- IT Services: gestion de infraestructura, ciberseguridad, servicios en la nube, consultoria tecnologica.\n"
        . "- Automatizacion: RPA, integracion de sistemas, automatizacion en la nube, optimizacion de operaciones.\n\n"
        . "CONTACTO\n"
        . "- Santiago, Chile. WhatsApp disponible en el sitio.\n\n"
        . "TU OBJETIVO\n"
        . "1) Saluda a $nombre por su nombre y entiende que necesita, respondiendo sus preguntas con la informacion de arriba.\n"
        . "2) En cuanto tengas claro que producto o servicio le interesa (Licitracker, Traza, Broker IA, software a medida, automatizacion, etc.) y un resumen breve de su necesidad, usa la herramienta actualizar_lead UNA sola vez para dejarlo registrado.\n"
        . "3) Despues de usarla, confirmale que un consultor de Gliro la va a contactar pronto por el contacto que ya dejo.";
}

function gliro_chat_lead_tool() {
    return array(
        'type'     => 'function',
        'function' => array(
            'name'        => 'actualizar_lead',
            'description' => 'Registra en la ficha del visitante que producto/servicio de Gliro le interesa y un resumen de su necesidad. Usar solo una vez que se entienda claramente su interes.',
            'parameters'  => array(
                'type'       => 'object',
                'properties' => array(
                    'empresa' => array('type' => 'string', 'description' => 'Empresa u organizacion del visitante, solo si la menciona y no se sabia antes'),
                    'interes' => array('type' => 'string', 'description' => 'Que producto o servicio de Gliro le interesa (Licitracker, Traza, Broker IA, software a medida, automatizacion, etc.)'),
                    'notas'   => array('type' => 'string', 'description' => 'Resumen breve de lo que necesita o contexto relevante de la conversacion'),
                ),
                'required' => array('interes'),
            ),
        ),
    );
}

/* =======================================================================
 * REST API
 *  - POST /wp-json/gliro-chat/v1/register  -> crea el lead (formulario obligatorio)
 *  - POST /wp-json/gliro-chat/v1/message   -> conversa con DeepSeek
 * ===================================================================== */

add_action('rest_api_init', 'gliro_chat_register_routes');
function gliro_chat_register_routes() {
    register_rest_route('gliro-chat/v1', '/register', array(
        'methods'             => 'POST',
        'callback'            => 'gliro_chat_handle_register',
        'permission_callback' => '__return_true',
    ));
    register_rest_route('gliro-chat/v1', '/message', array(
        'methods'             => 'POST',
        'callback'            => 'gliro_chat_handle_message',
        'permission_callback' => '__return_true',
    ));
}

function gliro_chat_client_ip() {
    return isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : 'unknown';
}

function gliro_chat_is_rate_limited($ip, $bucket = 'msg', $max = 40) {
    $key   = 'gliro_chat_rl_' . $bucket . '_' . md5($ip);
    $count = (int) get_transient($key);
    if ($count >= $max) {
        return true;
    }
    set_transient($key, $count + 1, 15 * MINUTE_IN_SECONDS);
    return false;
}

function gliro_chat_handle_register(WP_REST_Request $request) {
    $ip = gliro_chat_client_ip();
    if (gliro_chat_is_rate_limited($ip, 'reg', 20)) {
        return new WP_REST_Response(array('error' => 'Demasiados intentos. Espera un momento y vuelve a intentar.'), 429);
    }

    $body     = $request->get_json_params();
    $nombre   = isset($body['nombre']) ? sanitize_text_field($body['nombre']) : '';
    $email    = isset($body['email']) ? sanitize_email($body['email']) : '';
    $telefono = isset($body['telefono']) ? sanitize_text_field($body['telefono']) : '';
    $empresa  = isset($body['empresa']) ? sanitize_text_field($body['empresa']) : '';

    if ($nombre === '') {
        return new WP_REST_Response(array('error' => 'Falta tu nombre.'), 400);
    }
    if ($email === '' && $telefono === '') {
        return new WP_REST_Response(array('error' => 'Déjanos al menos un email o un teléfono para poder contactarte.'), 400);
    }
    if ($email !== '' && !is_email($email)) {
        return new WP_REST_Response(array('error' => 'Ese email no parece válido.'), 400);
    }

    $post_id = wp_insert_post(array(
        'post_type'   => 'gliro_lead',
        'post_title'  => $nombre,
        'post_status' => 'publish',
    ), true);

    if (is_wp_error($post_id)) {
        return new WP_REST_Response(array('error' => 'No se pudo guardar tu registro. Intenta de nuevo.'), 500);
    }

    update_post_meta($post_id, '_gliro_email', $email);
    update_post_meta($post_id, '_gliro_telefono', $telefono);
    update_post_meta($post_id, '_gliro_empresa', $empresa);
    update_post_meta($post_id, '_gliro_origen', 'chat');

    gliro_chat_notify_new_lead($post_id, $nombre, $empresa, $email, $telefono);

    return new WP_REST_Response(array('ok' => true, 'lead_id' => $post_id, 'nombre' => $nombre), 200);
}

function gliro_chat_notify_new_lead($post_id, $nombre, $empresa, $email, $telefono) {
    $to        = get_option('gliro_chat_notify_email', get_option('admin_email'));
    $edit_link = admin_url('post.php?post=' . $post_id . '&action=edit');
    $subject   = 'Nuevo contacto en el chat: ' . $nombre . ($empresa !== '' ? ' — ' . $empresa : '');
    $body      = "Alguien empezo a chatear en gliro.cl y dejo sus datos.\n\n"
        . "Nombre: $nombre\n"
        . "Empresa: " . ($empresa !== '' ? $empresa : '-') . "\n"
        . "Email: " . ($email !== '' ? $email : '-') . "\n"
        . "Telefono: " . ($telefono !== '' ? $telefono : '-') . "\n\n"
        . "Puedes contactarlo directamente, o ver/editar el lead aqui:\n$edit_link";

    $headers = array();
    if ($email !== '' && is_email($email)) {
        $headers[] = 'Reply-To: ' . $email;
    }

    wp_mail($to, $subject, $body, $headers);
}

function gliro_chat_handle_message(WP_REST_Request $request) {
    $ip = gliro_chat_client_ip();
    if (gliro_chat_is_rate_limited($ip, 'msg', 40)) {
        return new WP_REST_Response(array('error' => 'Demasiados mensajes seguidos. Espera un momento y vuelve a intentar.'), 429);
    }

    $body    = $request->get_json_params();
    $lead_id = isset($body['lead_id']) ? absint($body['lead_id']) : 0;
    $lead_post = $lead_id ? get_post($lead_id) : null;

    if (!$lead_post || $lead_post->post_type !== 'gliro_lead') {
        return new WP_REST_Response(array('error' => 'Primero completa tus datos de contacto para poder chatear.'), 400);
    }

    $api_key = get_option('gliro_chat_api_key', '');
    if (empty($api_key)) {
        return new WP_REST_Response(array(
            'reply'       => 'El chat todavía no está conectado a una clave de API. Mientras tanto, escríbenos por WhatsApp y te respondemos altiro.',
            'leadUpdated' => false,
        ), 200);
    }

    $incoming = (isset($body['messages']) && is_array($body['messages'])) ? $body['messages'] : array();
    $messages = array();
    foreach ($incoming as $m) {
        if (!is_array($m) || !isset($m['role'], $m['content'])) {
            continue;
        }
        if ($m['role'] !== 'user' && $m['role'] !== 'assistant') {
            continue;
        }
        if (!is_string($m['content'])) {
            continue;
        }
        $messages[] = array('role' => $m['role'], 'content' => sanitize_textarea_field($m['content']));
    }
    if (count($messages) > 20) {
        $messages = array_slice($messages, -20);
    }
    if (empty($messages)) {
        return new WP_REST_Response(array('error' => 'Falta un mensaje del usuario.'), 400);
    }
    $last = end($messages);
    if ($last['role'] !== 'user') {
        return new WP_REST_Response(array('error' => 'Falta un mensaje del usuario.'), 400);
    }

    $lead = array(
        'nombre'   => $lead_post->post_title,
        'empresa'  => get_post_meta($lead_id, '_gliro_empresa', true),
        'email'    => get_post_meta($lead_id, '_gliro_email', true),
        'telefono' => get_post_meta($lead_id, '_gliro_telefono', true),
    );

    $model = get_option('gliro_chat_model', 'deepseek-chat');

    $openai_messages   = array();
    $openai_messages[] = array('role' => 'system', 'content' => gliro_chat_system_prompt($lead));
    foreach ($messages as $m) {
        $openai_messages[] = array('role' => $m['role'], 'content' => $m['content']);
    }

    $lead_updated = false;

    for ($i = 0; $i < 3; $i++) {
        $result = gliro_chat_call_deepseek($openai_messages, $model, $api_key);

        if (is_wp_error($result)) {
            return new WP_REST_Response(array('error' => 'Hubo un problema hablando con el asistente. Intenta de nuevo en un momento.'), 500);
        }

        $message = isset($result['choices'][0]['message']) ? $result['choices'][0]['message'] : null;
        if (!is_array($message)) {
            return new WP_REST_Response(array(
                'reply'       => 'Perdona, no pude generar una respuesta. ¿Puedes reformular tu mensaje?',
                'leadUpdated' => $lead_updated,
            ), 200);
        }

        $tool_calls = (isset($message['tool_calls']) && is_array($message['tool_calls'])) ? $message['tool_calls'] : array();

        if (!empty($tool_calls)) {
            $openai_messages[] = $message;

            foreach ($tool_calls as $tc) {
                $name     = isset($tc['function']['name']) ? $tc['function']['name'] : '';
                $args_raw = isset($tc['function']['arguments']) ? $tc['function']['arguments'] : '{}';
                $args     = json_decode($args_raw, true);
                if (!is_array($args)) {
                    $args = array();
                }

                $result_text = 'OK';
                if ($name === 'actualizar_lead') {
                    if (!empty($args['interes'])) {
                        update_post_meta($lead_id, '_gliro_interes', sanitize_text_field($args['interes']));
                    }
                    if (!empty($args['notas'])) {
                        update_post_meta($lead_id, '_gliro_notas', sanitize_textarea_field($args['notas']));
                    }
                    if (!empty($args['empresa']) && empty($lead['empresa'])) {
                        update_post_meta($lead_id, '_gliro_empresa', sanitize_text_field($args['empresa']));
                    }
                    $lead_updated = true;
                    $result_text  = 'Lead actualizado correctamente.';
                }

                $openai_messages[] = array(
                    'role'         => 'tool',
                    'tool_call_id' => isset($tc['id']) ? $tc['id'] : '',
                    'content'      => $result_text,
                );
            }
            continue;
        }

        $text = isset($message['content']) && is_string($message['content']) ? $message['content'] : '';

        return new WP_REST_Response(array(
            'reply'       => ($text !== '') ? $text : 'Perdona, no pude generar una respuesta. ¿Puedes reformular tu mensaje?',
            'leadUpdated' => $lead_updated,
        ), 200);
    }

    return new WP_REST_Response(array(
        'reply'       => 'Gracias por la información. Un consultor de Gliro te va a contactar pronto.',
        'leadUpdated' => $lead_updated,
    ), 200);
}

function gliro_chat_call_deepseek($messages, $model, $api_key) {
    $response = wp_remote_post('https://api.deepseek.com/chat/completions', array(
        'timeout' => 30,
        'headers' => array(
            'content-type' => 'application/json',
            'authorization' => 'Bearer ' . $api_key,
        ),
        'body' => wp_json_encode(array(
            'model'      => $model,
            'max_tokens' => 500,
            'messages'   => $messages,
            'tools'      => array(gliro_chat_lead_tool()),
        )),
    ));

    if (is_wp_error($response)) {
        return $response;
    }

    $code = wp_remote_retrieve_response_code($response);
    $data = json_decode(wp_remote_retrieve_body($response), true);

    if ($code < 200 || $code >= 300 || !is_array($data)) {
        return new WP_Error('deepseek_error', 'DeepSeek API error ' . $code);
    }

    return $data;
}

/* =======================================================================
 * Frontend: boton flotante + formulario obligatorio + panel de chat
 * ===================================================================== */

add_action('wp_enqueue_scripts', 'gliro_chat_enqueue_assets');
function gliro_chat_enqueue_assets() {
    wp_enqueue_style('gliro-chat-widget', GLIRO_CHAT_URL . 'assets/chat-widget.css', array(), GLIRO_CHAT_VERSION);
    wp_enqueue_script('gliro-chat-widget', GLIRO_CHAT_URL . 'assets/chat-widget.js', array(), GLIRO_CHAT_VERSION, true);
    wp_localize_script('gliro-chat-widget', 'gliroChatConfig', array(
        'registerEndpoint' => esc_url_raw(rest_url('gliro-chat/v1/register')),
        'messageEndpoint'  => esc_url_raw(rest_url('gliro-chat/v1/message')),
    ));
}

add_action('wp_footer', 'gliro_chat_render_widget');
function gliro_chat_render_widget() {
    ?>
    <div id="chat-widget">
        <button type="button" id="chat-toggle" aria-haspopup="dialog" aria-expanded="false" aria-label="Hablar con un consultor de Gliro">🤖</button>
        <div id="chat-panel" role="dialog" aria-label="Chat con un consultor de Gliro">
            <div class="chat-header">
                <div>
                    <strong>Consultor Gliro</strong>
                    <span class="chat-status">En línea</span>
                </div>
                <button type="button" id="chat-close" aria-label="Cerrar chat">&times;</button>
            </div>

            <div class="chat-register" id="chat-register">
                <p class="chat-register-intro">Para conversar con nuestro consultor, cuéntanos primero quién eres 🙂</p>
                <form id="chat-register-form">
                    <label>Nombre*
                        <input type="text" id="reg-nombre" autocomplete="name" required maxlength="120">
                    </label>
                    <label>Email
                        <input type="email" id="reg-email" autocomplete="email" maxlength="160">
                    </label>
                    <label>Teléfono
                        <input type="tel" id="reg-telefono" autocomplete="tel" maxlength="40">
                    </label>
                    <label>Empresa
                        <input type="text" id="reg-empresa" autocomplete="organization" maxlength="160">
                    </label>
                    <p class="chat-register-hint">Necesitamos al menos tu email o tu teléfono.</p>
                    <p class="chat-register-error" id="chat-register-error" hidden></p>
                    <button type="submit" class="btn-register">Empezar a chatear</button>
                </form>
            </div>

            <div class="chat-messages" id="chat-messages" hidden></div>
            <form class="chat-form" id="chat-form" hidden>
                <input type="text" id="chat-input" placeholder="Escribe tu mensaje..." autocomplete="off" maxlength="600" required>
                <button type="submit" aria-label="Enviar mensaje">➤</button>
            </form>
        </div>
    </div>
    <?php
}
