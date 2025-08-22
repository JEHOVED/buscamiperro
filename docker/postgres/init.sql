-- Habilitar extensión PostGIS para funciones geoespaciales
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear esquema principal
CREATE SCHEMA IF NOT EXISTS buscamiperro;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    google_id VARCHAR(255),
    facebook_id VARCHAR(255),
    display_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    language VARCHAR(10) DEFAULT 'es',
    reputation INTEGER DEFAULT 0,
    is_blocked BOOLEAN DEFAULT FALSE,
    gdpr_consent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- Tabla de perros perdidos
CREATE TABLE IF NOT EXISTS dogs_lost (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    breed VARCHAR(255),
    color VARCHAR(255),
    description TEXT,
    lost_at TIMESTAMP WITH TIME ZONE NOT NULL,
    last_pos GEOGRAPHY(POINT, 4326) NOT NULL,
    photo_url TEXT,
    status VARCHAR(50) DEFAULT 'lost' CHECK (status IN ('lost', 'found', 'tracking')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de avistamientos
CREATE TABLE IF NOT EXISTS sightings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    description TEXT,
    pos GEOGRAPHY(POINT, 4326) NOT NULL,
    spotted_at TIMESTAMP WITH TIME ZONE NOT NULL,
    photo_url TEXT,
    matched_dog_id UUID REFERENCES dogs_lost(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de coincidencias
CREATE TABLE IF NOT EXISTS matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dog_id UUID NOT NULL REFERENCES dogs_lost(id) ON DELETE CASCADE,
    sighting_id UUID NOT NULL REFERENCES sightings(id) ON DELETE CASCADE,
    distance_m FLOAT NOT NULL,
    algo_score FLOAT DEFAULT 0.0,
    owner_confirmed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(dog_id, sighting_id)
);

-- Tabla de salas de chat
CREATE TABLE IF NOT EXISTS chat_rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dog_id UUID NOT NULL REFERENCES dogs_lost(id) ON DELETE CASCADE,
    sighting_id UUID NOT NULL REFERENCES sightings(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(dog_id, sighting_id)
);

-- Tabla de mensajes de chat
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de reportes/denuncias
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    target_type VARCHAR(50) NOT NULL CHECK (target_type IN ('dog', 'sighting', 'user', 'message')),
    target_id UUID NOT NULL,
    reason_code VARCHAR(100) NOT NULL,
    comment TEXT,
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Tabla de tokens push
CREATE TABLE IF NOT EXISTS push_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    endpoint TEXT NOT NULL,
    p256dh TEXT NOT NULL,
    auth TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, endpoint)
);

-- Índices geoespaciales para búsquedas eficientes
CREATE INDEX IF NOT EXISTS idx_dogs_lost_pos ON dogs_lost USING GIST(last_pos);
CREATE INDEX IF NOT EXISTS idx_sightings_pos ON sightings USING GIST(pos);

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_dogs_lost_owner_id ON dogs_lost(owner_id);
CREATE INDEX IF NOT EXISTS idx_dogs_lost_status ON dogs_lost(status);
CREATE INDEX IF NOT EXISTS idx_dogs_lost_created_at ON dogs_lost(created_at);

CREATE INDEX IF NOT EXISTS idx_sightings_reporter_id ON sightings(reporter_id);
CREATE INDEX IF NOT EXISTS idx_sightings_spotted_at ON sightings(spotted_at);
CREATE INDEX IF NOT EXISTS idx_sightings_matched_dog_id ON sightings(matched_dog_id);

CREATE INDEX IF NOT EXISTS idx_matches_dog_id ON matches(dog_id);
CREATE INDEX IF NOT EXISTS idx_matches_sighting_id ON matches(sighting_id);
CREATE INDEX IF NOT EXISTS idx_matches_owner_confirmed ON matches(owner_confirmed);

CREATE INDEX IF NOT EXISTS idx_chat_messages_room_id ON chat_messages(room_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_sent_at ON chat_messages(sent_at);

CREATE INDEX IF NOT EXISTS idx_reports_target_type_id ON reports(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_reports_resolved ON reports(resolved);

CREATE INDEX IF NOT EXISTS idx_push_tokens_user_id ON push_tokens(user_id);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dogs_lost_updated_at BEFORE UPDATE ON dogs_lost
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sightings_updated_at BEFORE UPDATE ON sightings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Datos de ejemplo para desarrollo
INSERT INTO users (email, display_name, password_hash, language) VALUES 
('admin@buscamiperro.com', 'Administrador', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uIoO', 'es'),
('test@example.com', 'Usuario de Prueba', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uIoO', 'es')
ON CONFLICT (email) DO NOTHING;